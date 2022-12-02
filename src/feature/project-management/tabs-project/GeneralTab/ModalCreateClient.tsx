import React from 'react';
import { Form, Input, Modal, Button } from 'antd';
import { ICustomerPost } from '../../../../redux/customer/customer.interface';
import { useAppDispatch } from '../../../../hooks/useToast';
import { postCustomer } from '../../../../redux/customer/thunks';
interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalCreateProject ({ isOpen, setIsOpen }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const onFinish = async (data: ICustomerPost): Promise<void> => {
    await dispatch(postCustomer(data));
    setIsOpen(false);
  };
  const onCancel = (): void => {
    setIsOpen(false);
  };
  return (
    <Modal
      className='project-client'
      title="Create Client"
      open={ isOpen } width='59em'
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel} >Cancel</Button>
      ]}
    >
      <Form onFinish= {onFinish} className='create-client'>
        <Form.Item
         name='name'
         label='Name'
         rules={[
           { required: true }
         ]}
        >
          <Input placeholder='name' />
        </Form.Item>
        <Form.Item
         name='code'
         label='Code'
         rules={[
           { required: true }
         ]}
        >
          <Input placeholder='code' />
        </Form.Item>
        <Form.Item
         name='address'
         label='Address'
         rules={[
           { required: true }
         ]}
        >
          <Input placeholder='address' />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>Save</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
