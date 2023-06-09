import React, { useEffect, useRef, useState } from 'react';

import { useModel } from 'umi'
import { Line } from '@ant-design/plots';
import { Form, Input, Button, Space, Empty } from 'antd'
import { ProCard, ProForm, StepsForm } from '@ant-design/pro-components';

import GlobalUpload from '@/components/GlobalUpload'
import dayjs from 'dayjs'
const FormItem = Form.Item
const { TextArea } = Input
import styles from './Welcome.less'

import * as service_welcome from '@/services/welcome'

const Join = () => {
  const { initialState: { settings } } = useModel('@@initialState');
  const [data, setData] = useState([]);
  const [money, setMoney] = useState(0);
  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const formRef = useRef()
  return (
    <ProCard className={styles.container} >

      <StepsForm
        formRef={formRef}
        current={1}
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
          render: props => {
            if (props.step == 0) {
              return <Button onClick={() => props.onSubmit()} type="primary" >确认提交</Button>
            }
          }
        }}
      >
        <StepsForm.StepForm
          layout="horizontal"
          name="base"
          title="企业入驻"
          {...formLayout}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            return true;
          }}
        >

          <FormItem
            name="img"
            label="企业logo"
            rules={[{ required: false, message: '请上传图片！' }]}
          >
            <GlobalUpload data={{ type: 'test' }} maxCount={1} />
          </FormItem>
          <FormItem
            name="img"
            label="企业图片"
            rules={[{ required: false, message: '请上传图片！' }]}
          >
            <GlobalUpload data={{ type: 'test' }} maxCount={9} />
          </FormItem>

          <FormItem
            name="name"
            label="企业名称"
            rules={[{ required: false, message: '请输入！' }]}
          >
            <Input placeholder="请输入" maxLength={50} allowClear />
          </FormItem>
          <FormItem
            name="name"
            label="企业介绍"
            rules={[{ required: false, message: '请输入！' }]}
          >
            <TextArea placeholder="请输入" autoSize={{ minRows: 2, maxRows: 6 }} maxLength={500} allowClear showCount />
          </FormItem>
          <FormItem wrapperCol={{ offset: 6 }}  >

            <Space  >
              <span>请下载入驻协议,签字并盖章后已图片形式提交</span>
              <Button type="primary" >模板下载</Button>
            </Space>
          </FormItem>


          <FormItem
            name="img"
            label="营业许可证"
            rules={[{ required: false, message: '请上传图片！' }]}
          >
            <GlobalUpload data={{ type: 'test' }} maxCount={1} />
          </FormItem>
          <FormItem
            name="img"
            label="入住协议"
            rules={[{ required: false, message: '请上传图片！' }]}
          >
            <GlobalUpload data={{ type: 'test' }} maxCount={1} />
          </FormItem>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          title="平台审核"
        >


          <div className={styles.empty}>
            <Space direction="vertical" align='center' >
              <img src={require('@/assets/audit.png')} />
              <span>内容审核中,请耐心等待</span>
            </Space>
            <Space direction="vertical" align='center'  >
              <img src={require('@/assets/error.png')} />
              <span className={styles.title}> 审核失败</span>
              <span className={styles.error} > 审核失败原因审核失败原因审核失败原因审核失败原因审核失败原因审核失败原因</span>
            </Space>
          </div>


        </StepsForm.StepForm>
        <StepsForm.StepForm
          title="入驻成功"
        >

        </StepsForm.StepForm>

      </StepsForm>
    </ProCard >
  )
};

export default Join;
