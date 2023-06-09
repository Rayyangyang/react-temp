import React, { useEffect, useRef, useState } from 'react';

import { useModel } from 'umi'
import { Form, DatePicker, Avatar, Space, Card, Button, Modal, Radio } from 'antd'
import { ProForm } from '@ant-design/pro-components';
import { UserOutlined, EditOutlined } from '@ant-design/icons';


import EditForm from './EditForm'
import GlobalModal from '@/components/GlobalModal'
import dayjs from 'dayjs'
const FormItem = Form.Item
import * as service_welcome from '@/services/welcome'

import styles from './Welcome.less'
const Welcome = () => {
  const { initialState: { settings } } = useModel('@@initialState');


  const [payModalVisible, handlePayModalVisible] = useState(false)
  const [editModalVisible, handleEditModalVisible] = useState(false)
  const gird = [
    { text: '待发布广告', value: 4, },
    { text: '已发布广告', value: 4, },
    { text: '已过期广告', value: 4, },
    { text: '可刷新置顶', value: 4, tips: "(开通置顶服务后可用)" },
  ]
  const handleUpdate = async fields => {
    const hide = message.loading({ content: '操作中', key: 'loading' });
    const res = await dispatch({
      type: 'global/service',
      service: fields.id ? service_demoTable.update : service_demoTable.add,
      payload: {
        id: fields.id,
        sort: fields.sort,
        name: fields.name,
        url: fields.url,
      }
    })
    hide();
    if (res?.code != 200) return message.error({ content: res.msg, key: 'error' });

    message.success({ content: '操作成功', key: 'success' });

  };
  return (
    <Card hoverable bordered >
      <Space align="center" className={styles.user_box}  >
        <Avatar
          size={66}
          draggable
          shape="square"
          icon={<UserOutlined />} />
        <Space direction="vertical" content='between' >
          <Space style={{ cursor: 'pointer' }} onClick={() => handleEditModalVisible(true)}  >
            <div className={styles.nickname}>企业名称</div>
            <EditOutlined />
          </Space>
          <div className={styles.time}>暂未开通/到期时间: {dayjs().format('YYYY_MM_DD')} </div>
        </Space>
      </Space>

      <div className={styles.desc}>
        介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企业介绍介绍企
      </div>

      <div className={styles.gird_box}>
        {gird.map(item => <Card key={item.text} hoverable bordered className={styles.gird_item}>
          <span className={styles.item_value}>{item.value}</span>
          <span>{item.text} {item.tips} </span>
        </Card>)}
      </div>


      <Card hoverable style={{ marginTop: 24 }} className={styles.pay_box}  >
        <div className={styles.title}>服务名称服务名称服务名称服务名称服务名称服务名称</div>
        <div className={styles.flex_box} >
          <div className={styles.price}>¥200/<span className={styles.suffix} >30天</span> </div>
          <Button onClick={() => handlePayModalVisible(true)} type="primary" >开通服务</Button>
        </div>
        <div className={styles.desc} >对应服务展示纯文本介绍对应服务展示纯文本介绍对应服务展示纯文本介绍</div>
      </Card>


      <div className={styles.rich_text} >
        <div className={styles.title}>服务市场</div>
        <div>这里是配置的富文本内容展示这里是配置的富文本内容展示这里是配置的富文本内容展示这里是配置的富文本内容展示这里是配置的富文本内容展示</div>
      </div>

      <Modal
        title="开通服务"
        focusTriggerAfterClose
        open={payModalVisible}
        onCancel={() => handlePayModalVisible(false)}
        footer={<div className={styles.modal_footer}>
          <span>待支付: ¥220</span>
          <Button onClick={() => handlePayModalVisible(true)} type="primary" >确认支付</Button>
        </div>}
      >
        <div className={styles.modal_title}>选择支付方式</div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >
          <Radio.Group>
            <Space size={24} >

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

      </Modal>

      <GlobalModal
        open={editModalVisible}
        onCancel={() => handleEditModalVisible(false)}
        title='修改信息'
      >
        <EditForm handleUpdate={handleUpdate} />
      </GlobalModal>

    </Card>
  );
};

export default Welcome;
