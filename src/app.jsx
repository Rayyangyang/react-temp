import { history, Link } from "umi";
import { notification, Space, Image, ConfigProvider } from "antd";
import md5 from "md5";
import defaultSettings from "../config/defaultSettings";
import { LinkOutlined, UserOutlined } from "@ant-design/icons";
// import { PageLoading } from '@ant-design/pro-components';
import React, { useState } from "react";
import RightContent from "@/components/RightContent";
import Exception403 from "@/pages/Exception/403";
import qs from "qs";
import * as service_module from "@/services/sys/module";

const codeMessage = {
	200: "服务器成功返回请求的数据。",
	201: "新建或修改数据成功。",
	202: "一个请求已经进入后台排队（异步任务）。",
	204: "删除数据成功。",
	400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
	401: "错误: 登录超时/异地登录",
	403: "用户得到授权，但是访问是被禁止的。",
	404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
	406: "请求的格式不可得。",
	410: "请求的资源被永久删除，且不会再得到的。",
	422: "当创建一个对象时，发生一个验证错误。",
	500: "服务器发生错误，请检查服务器。",
	502: "网关错误。",
	503: "服务不可用，服务器暂时过载或维护。",
	504: "网关超时。",
};
const errorHandler = (error) => {
	const { response } = error;
	if (response?.status) {
		const errorText = codeMessage[response.status] || response.statusText;
		const { status, url } = response;
		notification.error({
			key: "global_error",
			message: `请求错误 ${status}`,
			description: errorText,
		});
		if (status === 401) {
			history.replace("/user/login");
		}
	} else if (!response) {
		notification.error({
			key: "global_error",
			description: "您的网络发生异常，无法连接服务器",
			message: "网络异常",
		});
	}
	return response;
};
const headerInterceptor = (url, options) => {
	const timestamp = new Date().getTime();
	const rand = Math.floor(Math.random() * 100); //0-100随机整数
	if (url.substr(0, 4) != "http") {
		url = (process.env.NODE_ENV === "development" ? "/api" : requestUrl) + url;
	}
	return {
		url,
		options: {
			...options,
			data: options.requestType == "form" ? qs.stringify(options.data) : options.data,
			headers: {
				"Content-Type": options.requestType == "form" ? "application/x-www-form-urlencoded;charset=UTF-8" : "application/json;charset=UTF-8",
				"api-version": 1,
				token: localStorage.token,
				apiSecret: md5(md5(timestamp + "ccys" + rand)),
				timestamp,
				rand,
			},
		},
	};
};

//打包时接口请求路径
// const requestUrl = 'http://139.159.140.99:9000/api'
const requestUrl = "https://xcx.cddtcyxgs.com/yxyclub";
export const request = {
	errorConfig: { errorHandler },
	requestType: "form", //post 请求时数据类型，默认form，需要json时services层改变传值
	requestInterceptors: [headerInterceptor],
};

export async function getInitialState() {
	const ossHost = "https://school-coach-static.oss-cn-chengdu.aliyuncs.com"; //oss上传路径
	const ossSuffix = "?x-oss-process=video/snapshot,t_1000,m_fast"; //oss视频链接拼接此后缀即为视频封面图
	const getToken = () => localStorage.token;
	const setToken = (token) => (localStorage.token = token);
	const getUnionuser = () => (localStorage.unionuser ? JSON.parse(localStorage.unionuser) : null);
	const setUnionuser = (unionuser) => (localStorage.unionuser = JSON.stringify(unionuser));
	const uploadAction = requestUrl + "/web/file/upload";

	return {
		settings: defaultSettings,
		requestUrl,
		ossHost,
		ossSuffix,
		getToken,
		setToken,
		getUnionuser,
		setUnionuser,
		uploadAction,
	};
}

export const layout = ({ initialState, setInitialState }) => {
	const loopMenuItem = (menus) =>
		menus?.map(({ children, ...item }) => ({
			...item,
			routes: children && loopMenuItem(children),
		}));
	return {
		avatarProps: {
			src: <UserOutlined style={{ color: "#1677ff" }} />,
			size: "small",
			title: initialState.getUnionuser()?.nickname || initialState.getUnionuser()?.account,
			render: (props, dom) => <RightContent>{dom}</RightContent>,
		},
		actionsRender: (props) => [], //if不写这行，layout仅在top模式下没有显示avatarProps
		// rightContentRender: () => <RightContent />,
		// rightContentRender: false,
		onPageChange: () => {
			const {
				location: { pathname },
			} = history; // 如果没有登录，重定向到 login
			if (!initialState.getUnionuser() && pathname !== "/user/login") {
				history.replace("/user/login");
			}
		},
		onMenuHeaderClick: () => history.push("/"),
		// 面包屑
		breadcrumbRender: (routers = []) => [{ path: "/", breadcrumbName: "首页" }, ...routers],
		// 自定义渲染面包屑
		itemRender: (route, params, routes, paths) => {
			routes.forEach((item) => {
				const first = routes.indexOf(item) === 0;
				if (!first) delete item.path;
			});
			return route.breadcrumbName;
		},
		menu: {
			locale: false,
			// 权限路由
			params: { token: localStorage.token }, // 每当 localStorage.token 发生修改时重新执行 request
			// request: async (params, defaultMenuData) => {
			//   if (!params.token) return [] //没有token不走接口
			//   const res = await service_module.queryLoginModules()
			//   const menuRes = res.data.map(item => ({ ...item, icon: defaultMenuData.find(route => route.path == item.path)?.icon }))
			//   setInitialState({ ...initialState, menuRes })
			//   return loopMenuItem(menuRes)
			// }
		},

		// 自定义 403 页面
		unAccessible: <Exception403 />,
		// 增加一个 loading 的状态
		childrenRender: (children, props) => {
			// if (initialState?.loading) return <PageLoading />;

			return children;
		},
		...initialState?.settings,
	};
};
