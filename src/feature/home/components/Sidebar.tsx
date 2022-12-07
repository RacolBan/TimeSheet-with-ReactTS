import React, { useEffect, memo } from 'react';
import { Avatar, Typography } from 'antd';
import picture from '../../../assets/images/dsa.png';
import { IUserInfo } from '../../../redux/auth/interface';
import { useAppDispatch } from '../../../hooks/useToast';
import { getUserInforThunk } from '../../../redux/auth/thunks';
import { AppstoreAddOutlined } from '@ant-design/icons';
import SLink from '../../../components/Link';
interface Props {
  userInfo: IUserInfo
}
function Sidebar ({ userInfo }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const getUser = async (): Promise<void> => {
    await dispatch(getUserInforThunk());
  };
  useEffect(() => {
    void getUser();
  }, [dispatch]);
  return (
    <div className='sidebar'>
      <div className='sidebar-user'>
        <Avatar size='small' src={picture}>{(userInfo.avatarPath.length > 0) ? '' : userInfo.name?.charAt(0)?.toUpperCase()}</Avatar>
        <div className='sidebar-user-infor'>
          <Typography.Text> {userInfo.name} </Typography.Text>
          <Typography.Text> {userInfo.emailAddress}</Typography.Text>
        </div>
      </div>
      <div className="sidebar-link">
        <SLink to='/App/project' icon={<AppstoreAddOutlined />} title='Project Manage' />
      </div>
    </div>
  );
}
export default memo(Sidebar);
