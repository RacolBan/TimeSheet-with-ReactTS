import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
interface Props {
  handleCancel: () => void
  handleOk: () => void
  title: string
  open: boolean
}
export default function ConfirmModal ({ open, handleCancel, handleOk, title }: Props): JSX.Element {
  return (
    <Modal className='confirm-modal' open={open} title={title} onCancel={handleCancel} onOk={handleOk}>
      <span><ExclamationCircleOutlined /></span>
      <h1>Are you sure?</h1>
    </Modal>
  );
}
