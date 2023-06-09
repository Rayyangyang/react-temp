import React, { useState, useRef } from 'react';
import { Form, Button, Input, Radio, InputNumber, Select, message, Switch, Cascader, Space } from 'antd';
import { ProForm, StepsForm, ProDescriptions } from '@ant-design/pro-components';

import Field from '@ant-design/pro-field';
import { useSelector, useDispatch } from 'umi';

import GlobalUpload from '@/components/GlobalUpload'
import dayjs from 'dayjs'

import styles from '../../Welcome.less'
const { TextArea } = Input
const FormItem = Form.Item;
const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const UpdateForm = ({
  handleUpdate,
  values = {}
}) => {
  const submiting = useSelector(state => state.loading).effects['global/service']


  const formRef = useRef()

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

  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];


  return (
    <StepsForm
      formRef={formRef}
      current={0}
      onFinish={async () => {
        // await waitTime(1000);
        message.success('提交成功');
      }}
      formProps={{
        validateMessages: {
          required: '此项为必填项',
        },
      }}
      submitter={{
        render: props => <div style={{ marginTop: 32, }} >
          {props.step == 0 && <Button type="primary" onClick={() => props.onSubmit()}  >确定</Button>}
          {props.step == 1 && <Space size={48} >
            <Button onClick={() => props.onPre()}  >上一步</Button>
            <Button type="primary" onClick={() => props.onSubmit()}  >确定</Button>
          </Space>}
          {props.step == 2 && <div style={{ width: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
            <div style={{ color: '#f5222d', fontSize: 16, }} >待支付:¥200</div>
            <Button type="primary" onClick={() => props.onSubmit()}  >确认支付</Button>
          </div>}
        </div>
      }}
    >
      <StepsForm.StepForm
        layout="horizontal"
        name="base"
        title="广告投放"
        {...formLayout}
        onFinish={async () => {
          console.log(formRef.current?.getFieldsValue());
          return true;
        }}
      >
        <FormItem
          name="select"
          label="投放级别"
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
          name="cascader"
          label="具体投放"
          multiple
          rules={[{ required: true, message: '请选择！' }]}
        >
          <Cascader
            allowClear
            showSearch
            expandTrigger='hover'
            multiple
            placeholder="请选择"
            style={{ width: '100%' }}
            getPopupContainer={triggerNode => triggerNode.parentElement}
            options={options}
          />
        </FormItem>
        <FormItem
          name="select"
          label="投放时间"
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
              { value: 1, label: '1天' },
              { value: 2, label: '7天' },
              { value: 3, label: '1个月' },
              { value: 4, label: '3个月' },
              { value: 5, label: '6个月' },
              { value: 6, label: '1年' },
            ]}
          />

        </FormItem>
        <FormItem label="置顶服务" valuePropName="checked"  >
          <Space align='center'>
            <Switch />
            <span>说明:置顶服务需开通后可使用哦</span>
          </Space>
        </FormItem>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        title="信息完善"
      >
        <FormItem
          name="select"
          label="广告分类"
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
          label="广告标题"
          rules={[{ required: true, message: '请输入！' }]}
        >
          <Input placeholder="请输入" maxLength={50} allowClear />
        </FormItem>
        <FormItem
          name="name"
          label="广告内容"
          rules={[{ required: true, message: '请输入！' }]}
        >
          <TextArea placeholder="请输入" autoSize={{ minRows: 2, maxRows: 6 }} maxLength={500} allowClear showCount />
        </FormItem>

        {values.type == 1 && <FormItem
          name="img"
          label="广告图片"
          rules={[{ required: true, message: '请上传图片！' }]}
        >
          <GlobalUpload data={{ type: 'test' }} maxCount={9} />
        </FormItem>}
        {values.type == 2 && <>
          <FormItem
            name="img"
            label="视频封面"
            rules={[{ required: true, message: '请上传图片！' }]}
          >
            <GlobalUpload data={{ type: 'test' }} maxCount={1} />
          </FormItem>
          <FormItem
            name="img"
            label="视频内容"
            rules={[{ required: true, message: '请上传图片！' }]}
          >
            <GlobalUpload data={{ type: 'test' }} maxCount={1} />
          </FormItem>
        </>}

      </StepsForm.StepForm>
      <StepsForm.StepForm
        title="费用支付"
      >
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

        <div style={{ fontSize: 18, fontWeight: 'bold', marginTop: 32 }} >选择支付方式</div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around" }}  >
          <Radio.Group>
            <Space size={188} >

              <Radio value={0} >
                <Space>
                  <img style={{ width: 48, height: 48 }} src={require('@/assets/wechat.png')} />
                  <span>微信支付</span>
                </Space>
              </Radio>
              <Radio value={1} >
                <Space>
                  <img style={{ width: 48, height: 48 }} src={require('@/assets/alipay.png')} />
                  <span>支付宝支付</span>
                </Space>
              </Radio>
            </Space>
          </Radio.Group>
        </div>



      </StepsForm.StepForm>

      <StepsForm.StepForm title="内容审核" name="audit"   >

        <div className={styles.empty}>
          <Space direction="vertical" align='center' >
            <img src={require('@/assets/audit.png')} />
            <span>内容审核中,请耐心等待</span>
          </Space>
        </div>
      </StepsForm.StepForm>

      <StepsForm.StepForm title="发布成功" name="success"   >

        <div className={styles.empty}>
          <Space direction="vertical" align='center' >
            <img src={require('@/assets/audit.png')} />
            <span>内容审核中,请耐心等待</span>
          </Space>
        </div>
      </StepsForm.StepForm>

    </StepsForm >
  );
};

export default UpdateForm;
