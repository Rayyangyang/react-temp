import React from 'react';
import { Drawer } from 'antd';

const GlobalDrawer = ({
  onCancel,
  ...props
}) => {
  return (
    <Drawer
      width="60vw"
      destroyOnClose
      {...props}
      onClose={onCancel}
    >
      {props.children}
    </Drawer>
  );
};

export default GlobalDrawer;
