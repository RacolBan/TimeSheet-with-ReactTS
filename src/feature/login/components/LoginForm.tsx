import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { ILogin } from '../../../redux/auth/login.interface';
import { useAppDispatch } from '../../../hooks/useToast';
import { loginThunk } from '../../../redux/auth/thunks';

export default function LoginForm (): JSX.Element {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const onFinish = (data: ILogin): void => {
    const user = {
      username: data.username,
      password: data.password,
      rememberClient: data.rememberClient
    };
    void dispatch(
      loginThunk(user)
    );
  };
  return (
    <Form
      form={form}
      className="login-form"
      onFinish={onFinish}
    >
      <h1>Login</h1>
      <Form.Item
        name='username'
        rules={[
          { required: true, message: 'Please input your Username!' },
          { whitespace: true },
          { min: 3 }
        ]}
        hasFeedback
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          { required: true, message: 'Please input your password!' },
          { whitespace: true },
          { min: 6, message: 'Password at least 6 character' }
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item valuePropName="checked" name='rememberClient' noStyle >
        <Checkbox checked={checked} onChange={() => setChecked(!checked)}>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button-gg" block >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}
