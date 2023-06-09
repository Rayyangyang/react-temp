import React, { useState } from 'react';
import { Form, Button, Input, Radio } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import { LockOutlined } from '@ant-design/icons';

import { useSelector } from 'umi';

const FormItem = Form.Item;
const { TextArea } = Input
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const UpdateForm = ({
  handleUpdate,
  values
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
      initialValues={{
        fullname: formVals.fullname,
        account: formVals.account,
      }}
    >
      <FormItem
        name="account"
        label="登录账号"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <Input placeholder="请输入" maxLength={50} allowClear disabled={Boolean(values.id)} />
      </FormItem>
      <FormItem
        name="fullname"
        label="姓名"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <Input placeholder="请输入" maxLength={50} allowClear />
      </FormItem>
      {!values.id && <>
        <FormItem
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入！' }]}
        >
          <Input.Password placeholder="请输入" maxLength={50} allowClear />
        </FormItem>
        <FormItem
          name="confirmPassword"
          label="确认密码"
          rules={[
            { required: true, message: '请输入！' },
            {
              validator: (_, value) => {
                if (value != form.getFieldValue('password')) return Promise.reject(new Error('密码不一致'))
                return Promise.resolve()
              }
            }

          ]}
        >
          <Input.Password placeholder="请输入" maxLength={50} allowClear />
        </FormItem>
      </>}
      {renderFooter()}
    </ProForm>
  );
};

export default UpdateForm;
