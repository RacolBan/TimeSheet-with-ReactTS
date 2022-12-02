import React from 'react';
import LoginForm from './components/LoginForm';

function Login (): JSX.Element {
  // Your standard dispatch type does not know that you are using the thunk middleware
  return (
    <div className='login' >
      <div className='login-background'>
        <h1>Time Sheet</h1>
        <LoginForm />
      </div>
    </div>
  );
}
export default Login;
