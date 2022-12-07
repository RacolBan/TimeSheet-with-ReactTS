import { ArrowDownOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound (): JSX.Element {
  const navigate = useNavigate();
  const handleClickBack = (): void => {
    navigate('/App/login');
  };
  return (
    <div className='notFound'>
      <h1>404! That&lsquo;s an error </h1>
      <h1>The requested URL was not found</h1>
      <span><ArrowDownOutlined /></span>
      <button type='button' onClick={handleClickBack} ><span>Return Project</span></button>
    </div>
  );
}
