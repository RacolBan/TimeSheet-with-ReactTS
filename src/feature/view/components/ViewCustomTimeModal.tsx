import { Col, DatePicker, Form, Modal, Row } from 'antd';
import React from 'react';
interface Props {
  isOpen: boolean
  handleClose: () => void
  handleSave: (start: Date, end: Date) => void
}
interface Data {
  start: Date
  end: Date
}
export default function ViewCustomTimeModal ({ isOpen, handleClose, handleSave }: Props): JSX.Element {
  const onSave = (data: Data): void => {
    if ((data.start != null) && (data.end != null)) {
      handleSave(data.start, data.end);
    }
  };
  return (
    <Modal open={isOpen} onCancel={handleClose} className='viewCustom' footer={[

    ]} >
      <Form onFinish={onSave}>
        <Row className='row-date'>
          <Col span={8}>
            <Form.Item className='startTime' name='start' label="Start">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={8} offset={2}>
            <Form.Item className='endTime' name='end' label="To">
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
            <button className='btn-save' type='submit'> <span className='btn-text'>Save</span></button>
      </Form>
    </Modal>
  );
}
