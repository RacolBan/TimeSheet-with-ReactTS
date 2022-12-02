import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Select, Input, Typography } from 'antd';
import { EBranchUser, ETypeUser } from '../../../../redux/project/enum.user';
import { useAppDispatch } from '../../../../hooks/useToast';
import { changeFilterUnSelectedUserList } from '../../../../redux/project/slice';
import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
const branchList = [
  {
    text: 'All',
    value: EBranchUser.All
  },
  {
    text: 'Ha Noi',
    value: EBranchUser.HaNoi
  },
  {
    text: 'Da Nang',
    value: EBranchUser.DaNang
  },
  {
    text: 'Ho Chi Minh',
    value: EBranchUser.HoChiMinh
  }
];
const typeUserList = [
  {
    text: 'All',
    value: ETypeUser.All
  },
  {
    text: 'Staff',
    value: ETypeUser.Staff
  },
  {
    text: 'InternShip',
    value: ETypeUser.InternShip
  },
  {
    text: 'Collaborator',
    value: ETypeUser.Collaborator
  }
];
export default function UnSelectedMemberHeader (): JSX.Element {
  const [branch, setBranch] = useState(EBranchUser.All);
  const [type, setType] = useState(ETypeUser.All);
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(changeFilterUnSelectedUserList({ branch, type, search }));
  }, [branch, type, search, dispatch]);
  const debounceSearch = useCallback(debounce(e => setSearch(e.target.value), 300), []);
  return (
    <>
    <Row>
        <Col span={22}>
          <Typography.Title level={5}>Select Team Member</Typography.Title>
        </Col>
        <Col span={2}>
          <span><CaretDownOutlined /></span>
        </Col>
      </Row>
    <Row style={{ margin: '0 0 6px 0' }}>
      <Col span={5} offset={1}>
        <Typography.Text >Branch</Typography.Text>
        <Select style={{ width: '5em', height: '2em' }} value={branch} onChange={ (e: number) => setBranch(e)}>
          {branchList.map((branch, index) => (
            <Select.Option key={index} value={branch.value} >
              {branch.text}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={5} offset={1}>
        <Typography.Text >Type</Typography.Text>
        <Select style={{ width: '6em', height: '2em' }} value={type} onChange={ (e: number) => setType(e)} >
          {typeUserList.map((type, index) => (
            <Select.Option key={index} value={type.value}>{type.text}</Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={10} offset={1} style={{ padding: '20px 0 0 0 ' }} className='search-unselected' >
        <Input type='search' prefix={<SearchOutlined />} onChange={ e => debounceSearch(e)} placeholder='search by name.' />
      </Col>
    </Row>
    </>
  );
}
