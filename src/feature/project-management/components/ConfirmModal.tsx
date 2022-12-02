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
    <Modal open={open} title={title} onCancel={handleCancel} onOk={handleOk}>
      <h1>Are you sure?</h1>
    </Modal>
  );
}
