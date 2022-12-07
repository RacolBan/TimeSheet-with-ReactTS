/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select } from 'antd';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useToast';
import { getIsLoading, projectRemaninng } from '../../../redux/project/selector';
import { changeCreateOpenModal } from '../../../redux/project/slice';
import { getAllProject } from '../../../redux/project/thunks';

interface Props {
  setLoadingBySearch: React.Dispatch<React.SetStateAction<boolean>>
}
function CreateAndFilterProject ({ setLoadingBySearch }: Props): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get('search');
  const queryStatus = searchParams.get('status');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projectList = useSelector(projectRemaninng);
  const loading = useSelector(getIsLoading);
  const valueSelect = (): string => {
    switch (queryStatus) {
      case '1' : return `Deactive Projects (${projectList.length})`;
      case '0' : return `Active Projects (${projectList.length})`;
      case null: return `Active Projects (${projectList.length})`;
      default: return `All Projects (${projectList.length})`;
    }
  };
  const handleChangeFilterStatus = (value: string): void => {
    void dispatch(getAllProject({ status: value, search: querySearch ?? '' }));
  };
  useEffect(() => {
    if (queryStatus != null) {
      handleChangeFilterStatus(queryStatus);
    } else {
      void dispatch(getAllProject({ status: '0', search: null }));
    }
  }, [queryStatus]);
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
              setSearchParams({ status: value, search: querySearch ?? '' });
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
          <Input.Search
            placeholder='Search by client or project name'
            prefix={<SearchOutlined />}
            onSearch= {(value: string) => {
              setSearchParams({ status: queryStatus ?? '0', search: value });
              void dispatch(getAllProject({ status: queryStatus ?? '0', search: value }));
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
export default memo(CreateAndFilterProject);
