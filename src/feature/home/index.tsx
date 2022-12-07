import React from 'react';
import { Row, Col } from 'antd';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { logout } from '../../redux/auth/slice';
import { useAppDispatch } from '../../hooks/useToast';
import { removeAccessToken } from '../../helper/localStorage';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IUserInfo } from '../../redux/auth/interface';
export default function TimeSheet (): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClickButton = (): void => {
    removeAccessToken();
    navigate('login');
    dispatch(logout());
  };
  const userInfo = useSelector((state: IUserInfo) => state.authReducer.userInfor);
  return (
    <>
      <Row>
        <Col span={24}><Header onClick={handleClickButton} /></Col>
      </Row>
      <Row>
        <Col span={6} ><Sidebar userInfo = { userInfo } /></Col>
        <Col span={18} >
          <Outlet />
        </Col>
      </Row>
    </>
  );
}
