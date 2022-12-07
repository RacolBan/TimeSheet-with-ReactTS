import React, { memo } from 'react';
import { Form, Modal, Button } from 'antd';
import { useAppDispatch } from '../../../../../hooks/useToast';
import { ICustomerPost } from '../../../../../redux/customer/interface';
import { postCustomer } from '../../../../../redux/customer/thunks';
import FormItem from '../../../../../components/FormItem';
interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ModalCreateProject ({ isOpen, setIsOpen }: Props): JSX.Element {
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
        <FormItem name='name' label='Name' placeholder='Name' />
        <FormItem name='code' label='Code' placeholder='Code' />
        <FormItem name='address' label='Address' placeholder='Address' />
        <Form.Item>
          <Button htmlType='submit'>Save</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default memo(ModalCreateProject);
