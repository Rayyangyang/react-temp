import React from 'react';
import { Button, message } from 'antd';
import { ExportOutlined } from '@ant-design/icons'

const GlobalExport = ({
  action, //接口路径
  params, //接口传参
  export_text = '导出'
}) => {

  const handleExport = async () => {
    const hide = message.loading({ content: '操作中', key: 'loading' });
    // console.log(params)
    const res = await action(params)
    if (!res.data) return message.error({ conten: '下载失败,请重试', key: 'error' });
    hide();
    console.log(res)
    const blob = new Blob([res.data]);
    const fileName = decodeURIComponent(res.headers['content-disposition']?.split('filename=')[1])
    console.log("🚀 ~ file: index.js:19 ~ handleExport ~ fileName", fileName)
    
    const objectURL = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = objectURL;
    a.target = '_blank'
    a.download = fileName
    a.click();
    URL.revokeObjectURL(objectURL);
    a = null;
  }

  return (
    <Button onClick={handleExport}>
      <ExportOutlined /> {export_text}
    </Button>
  )
}

export default GlobalExport