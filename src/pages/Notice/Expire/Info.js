import React, { useState } from 'react';
import { Form, Button, Input, Select } from 'antd';
import { ProDescriptions, ProForm } from '@ant-design/pro-components';
import { LockOutlined } from '@ant-design/icons';

import { useSelector } from 'umi';

import Field from '@ant-design/pro-field';
import GlobalUpload from '@/components/GlobalUpload'
const FormItem = Form.Item;
const { TextArea } = Input
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const Info = ({
  handleUpdate,
  values = {}
}) => {
  const submiting = useSelector(state => state.loading).effects['global/service']
  const [formVals, setFormVals] = useState({ ...values });

  const [form] = Form.useForm();



  const renderFooter = () => {
    return (
      <FormItem wrapperCol={24}>
        <div style={{ textAlign: 'right', marginTop: 12 }}>
          <Button type="primary" loading={submiting} htmlType="submit">
            刷新置顶
          </Button>
        </div>
      </FormItem>
    );
  };
  return (
    <>
      <ProDescriptions column={2} bordered style={{ width: 'auto', }}  >
        <ProDescriptions.Item label='广告分类' span={2} >
          <Field text="444" />
        </ProDescriptions.Item>
        <ProDescriptions.Item label='广告标题' span={2} >
          <Field text="444" />
        </ProDescriptions.Item>
        <ProDescriptions.Item label='投放级别'  >
          <Field text="444" />
        </ProDescriptions.Item>
        <ProDescriptions.Item label='具体投放' >
          <Field text="444" />
        </ProDescriptions.Item>
        <ProDescriptions.Item label='投放时间' span={2} >
          <Field text="444" />
        </ProDescriptions.Item>
        <ProDescriptions.Item label='广告内容' span={2}  >
          <Field text="444" />
        </ProDescriptions.Item>
        <ProDescriptions.Item label='广告图片' span={2}  >
          <Field text="444" />
        </ProDescriptions.Item>
        <ProDescriptions.Item label='视频封面' span={2}  >
          <Field text="444" />
        </ProDescriptions.Item>
        <ProDescriptions.Item label='视频内容' span={2}  >
          <Field text="444" />
        </ProDescriptions.Item>
      </ProDescriptions>
      {renderFooter()}
    </>

  );
};

export default Info;
