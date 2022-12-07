import { Form, Input } from 'antd';
import React from 'react';
interface Props {
  name: string
  label: string
  placeholder: string
}
export default function FormItem ({ name, label, placeholder }: Props): JSX.Element {
  return (
    <Form.Item
         name={name}
         label={label}
         rules={[
           { required: true }
         ]}
        >
          <Input placeholder={placeholder} />
        </Form.Item>
  );
}
