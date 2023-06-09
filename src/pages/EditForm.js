import React, { useState, useRef } from 'react';
import { Form, Button, Input, DatePicker, InputNumber, Select, message } from 'antd';
import { ProForm } from '@ant-design/pro-components';


import { useSelector, useDispatch } from 'umi';

import GlobalUpload from '@/components/GlobalUpload'
import dayjs from 'dayjs'

const { TextArea } = Input
const FormItem = Form.Item;
const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const EditForm = ({
  handleUpdate,
}) => {
  const submiting = useSelector(state => state.loading).effects['global/service']

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
      onFinish={fieldsValue => handleUpdate({ ...values, ...fieldsValue })}
      submitter={false}
      layout="horizontal"
      dateFormatter={false}
      {...formLayout}
      form={form}
    >

      <FormItem
        name="img"
        label="企业logo"
        rules={[{ required: true, message: '请上传图片！' }]}
      >
        <GlobalUpload data={{ type: 'test' }} maxCount={1} />
      </FormItem>


      <FormItem
        name="img"
        label="企业图片"
        rules={[{ required: true, message: '请上传图片！' }]}
      >
        <GlobalUpload data={{ type: 'test' }} maxCount={9} />
      </FormItem>

      <FormItem
        name="name"
        label="企业介绍"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <TextArea placeholder="请输入" autoSize={{ minRows: 2, maxRows: 6 }} maxLength={500} allowClear showCount />
      </FormItem>


      {renderFooter()}
    </ProForm>
  );
};

export default EditForm;
