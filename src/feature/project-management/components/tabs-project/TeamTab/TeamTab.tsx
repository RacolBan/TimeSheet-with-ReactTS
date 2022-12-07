import React, { useEffect } from 'react';
import { Col, Pagination, Row } from 'antd';
import { useSelector } from 'react-redux';
import { memberRemaining, memberSelectedRemaining } from '../../../../../redux/project/selector';

import MemberList from './MemberList';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../../hooks/useToast';
import { changePage } from '../../../../../redux/project/slice';
import { getAllUsersThunk, getTaskListThunk } from '../../../../../redux/project/thunks';
import { getAllCustomer } from '../../../../../redux/customer/thunks';
enum StatusMember {
  MemberSelected,
  MemberUnSelected
}
export default function TeamProject (): JSX.Element {
  const listMember = useSelector(memberRemaining);
  const listMemberSelected = useSelector(memberSelectedRemaining);
  const nav = useNavigate();
  const { page } = useParams();
  const dispatch = useAppDispatch();
  const handleOnChange = (page: number): void => {
    nav(`/App/project/Create/team/${page}`);
  };
  useEffect(() => {
    if (page !== undefined) {
      dispatch(changePage(Number(page)));
      void dispatch(getAllUsersThunk());
      void dispatch(getAllCustomer());
      void dispatch(getTaskListThunk());
      nav(`/App/project/Create/team/${page}`);
    }
  }, [page]);
  return (
    <Row>
      <Col span={14}>
        <MemberList type={StatusMember.MemberSelected} memberList={listMemberSelected} />
      </Col>
      <Col span={10} style={{ padding: '0 0 5px 10px', borderLeft: '1px solid #ccc7a', borderBottom: '1px solid black' }} >
        <MemberList type={StatusMember.MemberUnSelected} memberList={listMember} />
      </Col>
      <Col className='team-pagination'>
        <Pagination defaultCurrent={1} pageSize={10} total={988} onChange={handleOnChange} />
      </Col>
    </Row>
  );
}
