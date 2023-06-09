import React, { useState } from 'react';
import { Form, Button, Input, Select } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import { LockOutlined } from '@ant-design/icons';

import { useSelector } from 'umi';

import GlobalUpload from '@/components/GlobalUpload'
const FormItem = Form.Item;
const { TextArea } = Input
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const Cancel = ({
  handleUpdate,
  values = {}
}) => {
  const submiting = useSelector(state => state.loading).effects['global/service']
  const [formVals, setFormVals] = useState({ ...values });

  const [form] = Form.useForm();



  const renderFooter = () => {
    return (
      <FormItem wrapperCol={24}>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" loading={submiting} htmlType="submit">
            提交
          </Button>
        </div>
      </FormItem>
    );
  };
  return (
    <ProForm
      onFinish={fieldsValue => handleUpdate({ ...formVals, ...fieldsValue })}
      submitter={false}
      layout="horizontal"
      {...formLayout}
      form={form}

    >

      <FormItem
        name="select"
        label="取消原因"
        rules={[{ required: true, message: '请选择！' }]}
      >
        <Select
          allowClear
          showSearch
          optionFilterProp='label'
          placeholder="请选择"
          style={{ width: '100%' }}
          getPopupContainer={triggerNode => triggerNode.parentElement}
          options={[
            { value: 1, label: '全国广告' },
            { value: 2, label: '省级广告' },
            { value: 3, label: '市级广告' },
            { value: 4, label: '区/县广告' },
          ]}
        />

      </FormItem>

      <FormItem
        name="name"
        label="详情描述"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <TextArea placeholder="请输入" autoSize={{ minRows: 2, maxRows: 6 }} maxLength={500} allowClear showCount />
      </FormItem>
      <FormItem
        name="img"
        label="相关图片"
        rules={[{ required: true, message: '请上传图片！' }]}
      >
        <GlobalUpload data={{ type: 'test' }} maxCount={9} />
      </FormItem>
      {renderFooter()}
    </ProForm>
  );
};

export default Cancel;
