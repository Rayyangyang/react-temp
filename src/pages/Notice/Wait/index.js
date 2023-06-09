import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, message, Popconfirm, Switch, Popover } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useModel, useAccess, Access } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import StandardTable from '@/components/StandardTable';
import GlobalModal from '@/components/GlobalModal'
import UpdateForm from './UpdateForm';
import Cancel from './Cancel';

import * as service_common from '@/services/common'
import dayjs from 'dayjs'
const Notice = () => {
  const { initialState: { getUnionuser } } = useModel('@@initialState');


  const dispatch = useDispatch();
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [cancelModalVisible, handleCancelModalVisible] = useState(false);
  const actionRef = useRef();

  let columns = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
    },
    {
      title: '广告类型',
      dataIndex: 'name',
      valueEnum: { 0: '文字', 1: '图文', 2: '视频' },
      valueType: 'select'
    },

    {
      title: '置顶服务',
      dataIndex: 'price',
      valueEnum: { 0: '否', 1: '是' },
      valueType: 'select'
    },
    {
      title: '投放级别',
      dataIndex: 'num',
      search: false
    },
    {
      title: '具体投放',
      dataIndex: 'num',
      search: false
    },
    {
      title: '广告标题',
      dataIndex: 'num',
    },
    {
      title: '状态',
      dataIndex: 'state',
      valueType: 'select',
      search: false,
      valueEnum: { 0: '待审核', 1: '等待支付', 2: '审核失败' },

    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      render: (t, r) => r.createTime,
      fieldProps: (form) => ({
        disabledDate: current => current > dayjs().endOf('day'),
        defaultPickerValue: [dayjs().subtract(1, 'month'), dayjs()],
        placeholder: ['开始时间', '结束时间'],

      }),
    },

    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => (
        <Space>

          <a onClick={() => { handleUpdateModalVisible(true); setStepFormValues(record); }}>查看</a>
          <a onClick={() => { handleUpdateModalVisible(true); setStepFormValues(record); }}>立即支付</a>
          <a onClick={() => { handleUpdateModalVisible(true); setStepFormValues(record); }}>修改信息</a>
          <a style={{ color: '#f50' }} onClick={() => { handleCancelModalVisible(true); setStepFormValues(record); }}>取消发布</a>

        </Space >
      ),
    },
  ];

  const handleSwitchChange = async record => {
    const hide = message.loading({ content: '操作中', key: 'loading' });
    const res = await dispatch({
      type: 'global/service',
      service: service_common.update_gift,
      payload: {
        id: record.id,
        state: Number(record.state) ? 0 : 1
      }
    })
    hide()
    if (res?.code != 200) return message.error({ content: res.msg, key: 'error' });
    message.success({ content: '操作成功', key: 'success' });
    actionRef.current?.reload();
  }

  const handleUpdate = async fields => {
    console.log("🚀 ~ file: index.js:161 ~ handleUpdate ~ fields", fields)
    const hide = message.loading({ content: '操作中', key: 'loading' });
    const res = await dispatch({
      type: 'global/service',
      service: service_common.update_gift,
      payload: {
        id: fields.id,
        name: fields.name,
        num: fields.num,
        price: fields.price,


      }
    })
    hide();
    if (res?.code != 200) return message.error({ content: res.msg, key: 'error' });
    message.success({ content: '操作成功', key: 'success' });
    handleUpdateModalVisible(false);
    actionRef.current?.reload();
  };

  const handleDeleteRecord = async record => {
    const hide = message.loading({ content: '正在删除', key: 'loading' });
    const res = await dispatch({
      type: 'global/service',
      service: service_common.remove_gift,
      payload: { id: record.id }
    })
    hide()
    if (res?.code != 200) return message.error({ content: res.msg, key: 'error' });
    message.success({ content: '操作成功', key: 'success' });
    actionRef.current?.reload();
  }

  return (
    <PageContainer>
      <StandardTable
        actionRef={actionRef}
        toolBarRender={() => [
          <Popover trigger="hover" content={
            <Space>
              <Button type="primary" onClick={() => { setStepFormValues({ type: 2 }); handleUpdateModalVisible(true) }}>视频广告</Button>
              <Button type="primary" onClick={() => { setStepFormValues({ type: 1 }); handleUpdateModalVisible(true) }}>图文广告</Button>
              <Button type="primary" onClick={() => { setStepFormValues({ type: 0 }); handleUpdateModalVisible(true) }}>文字广告</Button>
            </Space>
          }  >

            <Button type="primary" >发布广告</Button>
          </Popover>

        ]}
        beforeSearchSubmit={params => {
          params.startTime = params.createTime?.[0].startOf('day').format('YYYY-MM-DD HH:mm:ss')
          params.endTime = params.createTime?.[1].endOf('day').format('YYYY-MM-DD HH:mm:ss')
          delete params.createTime
          return params
        }}
        request={({ current, ...params }) => {
          // console.log(params)//查询参数，pageNum用current特殊处理
          return service_common.query_gift({ ...params, pageNum: current })
        }}
        postData={data => data.list}
        dataSource={[{ id: 1, }]}
        columns={columns}
      />
      <GlobalModal
        open={updateModalVisible}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setStepFormValues({});
        }}
        width={1200}
        title={stepFormValues.id ? '查看' : '发布广告'}

      >
        <UpdateForm
          values={stepFormValues}
          handleUpdate={handleUpdate}
        />
      </GlobalModal>

      <GlobalModal
        open={cancelModalVisible}
        onCancel={() => {
          handleCancelModalVisible(false);
          setStepFormValues({});
        }}
        title='取消发布'
      >
        <Cancel handleUpdate={handleUpdate} />
      </GlobalModal>

    </PageContainer>
  );
};

export default Notice;
