import React from 'react';
import { Col, Pagination, Row } from 'antd';
import { useSelector } from 'react-redux';
import { memberRemaining, memberSelectedRemaining } from '../../../../redux/project/selector';

import MemberList from './MemberList';
import { changePage } from '../../../../redux/project/slice';
import { useAppDispatch } from '../../../../hooks/useToast';
import { useNavigate } from 'react-router-dom';
enum StatusMember {
  MemberSelected,
  MemberUnSelected
}
export default function TeamProject (): JSX.Element {
  const listMember = useSelector(memberRemaining);
  console.log(listMember);
  const listMemberSelected = useSelector(memberSelectedRemaining);
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const handleOnChange = (page: number): void => {
    nav(`/App/project/Create/team/${page}`);
    dispatch(changePage(page));
  };
  return (
    <Row>
      <Col span={14}>
        <MemberList type={StatusMember.MemberSelected} memberList={listMemberSelected} />
      </Col>
      <Col span={10} style={{ padding: '0 0 5px 10px', borderLeft: '1px solid #ccc7a', borderBottom: '1px solid black' }} >
        <MemberList type={StatusMember.MemberUnSelected} memberList={listMember} />
      </Col>
      <Col className='team-pagination'>
        <Pagination defaultCurrent={1} pageSize={100} total={988} onChange={handleOnChange} />
      </Col>
    </Row>
  );
}
