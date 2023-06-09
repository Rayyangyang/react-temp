import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, message, Popconfirm, Switch, Select } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import StandardTable from '@/components/StandardTable';
import GlobalModal from '@/components/GlobalModal'
import UpdateForm from './UpdateForm';
import UpdatePsd from '@/components/UpdatePsd'
const { Option } = Select;

import * as service_manager from '@/services/sys/manager';
import * as service_role from '@/services/sys/role';

const ChildManage = () => {
  const dispatch = useDispatch();
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [psdModalVisible, handlePsdModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();

  let columns = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
    },
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '姓名',
      dataIndex: 'fullname',
    },
    {
      title: '项目负责人',
      dataIndex: 'isManager',
      render: (text, record) => <Switch checked={Boolean(record.isManager)} onChange={() => handleSwitchChange(record)} checkedChildren="是" unCheckedChildren="否" />,
      valueEnum: {
        1: '项目负责人',
        0: '开发',
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => (
        <Space>
          <a onClick={() => { handlePsdModalVisible(true); setStepFormValues(record); }}>修改密码</a>
          <a onClick={() => { handleUpdateModalVisible(true); setStepFormValues(record); }}>编辑</a>
          <Popconfirm title="确定删除?" onConfirm={() => handleDeleteRecord(record)} okText="确定" cancelText="取消">
            <a style={{ color: '#f50' }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleSwitchChange = async record => {
    const hide = message.loading({ content: '操作中', key: 'loading' });
    const res = await dispatch({
      type: 'global/service',
      service: service_manager.updateManager,
      payload: {
        id: record.id,
        isManager: Number(record.isManager) ? 0 : 1
      }
    })
    hide()
    if (res?.code != 200) return message.error({ content: res.msg, key: 'error' });
    message.success({ content: '操作成功', key: 'success' });
    actionRef.current?.reload();
  }

  const handleUpdate = async fields => {
    const hide = message.loading({ content: '操作中', key: 'loading' });
    const res = await dispatch({
      type: 'global/service',
      service: service_manager.update,
      payload: {
        id: fields.id,
        account: fields.account,
        fullname: fields.fullname,
        confirmPassword: fields.confirmPassword,
        password: fields.password,
      }
    })
    hide();
    if (res?.code != 200) return message.error({ content: res.msg, key: 'error' });
    message.success({ content: '操作成功', key: 'success' });
    handleUpdateModalVisible(false);
    actionRef.current?.reload();
  };

  const handleDeleteRecord = async record => {
    const hide = message.loading({ content: '正在删除', key: 'delete' });
    const res = await dispatch({
      type: 'global/service',
      service: service_manager.remove,
      payload: { id: record.id }
    })
    hide();

    if (res?.code != 200) return message.error({ content: res.msg, key: 'error' });
    message.success({ content: '删除成功', key: 'success' });
    actionRef.current?.reload();
  };

  const handleUpdatePsd = async fields => {
    const hide = message.loading({ content: '操作中', key: 'loading' });
    const res = await dispatch({
      type: 'global/service',
      service: service_manager.updatePsd,
      payload: { id: stepFormValues.id, password: fields.password }
    })
    hide();
    if (res?.code != 200) return message.error({ content: res.msg, key: 'error' });
    message.success({ content: '操作成功', key: 'success' });
    handlePsdModalVisible(false)
    actionRef.current?.reload();
  }

  return (
    <PageContainer>
      <StandardTable
        search={false}
        actionRef={actionRef}
        toolBarRender={() => [
          <Button key='add' type="primary" onClick={() => { setStepFormValues({}); handleUpdateModalVisible(true) }}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={({ current, ...params }) => {
          // console.log(params)//查询参数，pageNum用current特殊处理
          return service_manager.query({ ...params, pageNum: current })
        }}
        postData={data => data.list}
        columns={columns}
      />
      <GlobalModal
        open={updateModalVisible}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setStepFormValues({});
        }}
        title={stepFormValues.id ? '编辑' : '新增'}
      >
        <UpdateForm
          values={stepFormValues}
          handleUpdate={handleUpdate}
        />
      </GlobalModal>
      <GlobalModal
        open={psdModalVisible}
        onCancel={() => {
          handlePsdModalVisible(false);
          setStepFormValues({});
        }}
        title='修改密码'
      >
        <UpdatePsd
          handleUpdate={handleUpdatePsd}
        />
      </GlobalModal>
    </PageContainer>
  );
};

export default ChildManage;
