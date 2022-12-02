import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select } from 'antd';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useToast';
import { getIsLoading, projectRemaninng } from '../../../redux/project/selector';
import { changeCreateOpenModal, changeSearchProject } from '../../../redux/project/slice';

interface Props {
  filterStatus: string
  handleChangeFilterStatus: (e: string) => void
  setLoadingBySearch: React.Dispatch<React.SetStateAction<boolean>>
}
export default function CreateAndFilterProject ({ filterStatus, handleChangeFilterStatus, setLoadingBySearch }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState('0');
  const projectList = useSelector(projectRemaninng);
  const loading = useSelector(getIsLoading);
  const valueSelect = (): string => {
    switch (status) {
      case '1' : return `Deactive Projects (${projectList.length})`;
      case '0' : return `Active Projects (${projectList.length})`;
      default: return `All Projects (${projectList.length})`;
    }
  };
  const debounceHandle = useCallback(debounce(e => {
    dispatch(changeSearchProject(e.target.value));
    setLoadingBySearch(false);
  }, 300), []);
  const handleClick = (): void => {
    dispatch(changeCreateOpenModal());
    navigate('/App/project/Create');
  };
  return (
    <div className='handle-project' >
      <Row className="handle-project-action">
        <Col span={5}>
          <Button block={true} type='primary' onClick={() => handleClick() }> + &nbsp;New Content</Button>
        </Col>
        <Col span={7} className='select'>
          <Select
            size='large'
            value={valueSelect()}
            disabled={loading}
            onChange={(value: string) => {
              handleChangeFilterStatus(value);
              setStatus(value);
            }}
            options={[
              {
                value: '0',
                label: 'Active '
              },
              {
                value: '1',
                label: 'InActive'
              },
              {
                value: '',
                label: 'All'
              }
            ]}
          >
          </Select>
        </Col>
        <Col span={12} className='search' >
          <Input
            placeholder='Search by client or project name'
            prefix={<SearchOutlined />}
            onChange= {(e: React.ChangeEvent<{ value: unknown }>) => {
              setLoadingBySearch(true);
              debounceHandle(e);
            } }
            type='search'
          />
        </Col>
      </Row>
    </div>
  );
}
