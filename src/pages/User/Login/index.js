import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { Alert, Checkbox, Form, Radio } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { useModel, history } from 'umi';
import styles from './index.less';
import * as services_login from '@/services/login';
import RichtText from './RichText';
import GlobalModal from '@/components/GlobalModal'




const LoginMessage = ({ content }) => (
  <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
);

const FormItem = Form.Item
export default () => {
  const [status, setStatus] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const { initialState: { settings, setToken, setUnionuser }, refresh } = useModel('@@initialState');

  const [modalVisible, handleModalVisible] = useState(false)
  const [initValue, setinitValue] = useState({})

  const handleSubmit = async (values) => {
    const response = await services_login.login(values);
    // console.log(response)

    if (response?.code == 200) {
      setToken(response.data.user.token);
      setUnionuser(response.data.user);
      history.replace('/');
      refresh()
    } else {
      setStatus('error')
      setErrorMsg(response.msg)
    }
  };


  const handleOpenModal = (e, action) => {
    e.stopPropagation();
    e.preventDefault()

    handleModalVisible(true)
    setinitValue(action)

  }


  return (
    <div className={styles.container} >

      <LoginFormPage
        style={{ position: 'relative', zIndex: 2 }}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        subTitle="做大做强 再创辉煌"
        logo={<img alt="logo" src={settings.logo} />}
        title={`${settings.title}`}
        onFinish={handleSubmit}
      >
        {status === 'error' && <LoginMessage content={errorMsg || "账号或密码错误"} />}

        <ProFormText
          name="account"
          fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
          placeholder='用户名'
          rules={[{ required: true, message: '请输入用户名!' }]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
          placeholder='密码'
          rules={[{ required: true, message: '请输入密码！' }]}
        />

        <FormItem name="checked"
          rules={[{ required: true, message: '请阅读并同意《用户协议》和《隐私政策》!' }]}
          valuePropName='checked'
        >

          <Checkbox style={{ userSelect: 'none' }} >
            我已阅读并同意<a onClick={e => handleOpenModal(e, 'user')}  >《用户协议》</a>和<a onClick={e => handleOpenModal(e, 'privacy')} >《隐私政策》</a>
          </Checkbox>

        </FormItem>



      </LoginFormPage>

      <GlobalModal
        open={modalVisible}
        onCancel={() => {
          handleModalVisible(false);
          setinitValue({});
        }}
        title={initValue == 'user' ? '用户协议' : '隐私政策'}
      >


        <RichtText value={initValue} />

      </GlobalModal>
    </div>
  );
};