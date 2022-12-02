import React from 'react';
import { Button } from 'antd';
import logo from '../../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
interface Props {
  onClick: () => void
}
export default function Header ({ onClick }: Props): JSX.Element {
  return (
    <div className='header' >
      <div className= 'header-logo'>
        <NavLink to='/' end >
          <img src={logo} height='35px' />
        </NavLink>
        <NavLink to='/' end className='header-logo-name' >TimeSheet</NavLink>
      </div>
      <div className='header-right'>
        <div className='header-right-btn'>
          <Button onClick = {onClick}>Sign out</Button>
        </div>
      </div>
    </div>
  );
}
