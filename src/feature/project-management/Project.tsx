import React, { useEffect, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import HeaderContent from './components/HeaderContent';
import { useAppDispatch } from '../../hooks/useToast';
import { useSelector } from 'react-redux';
import { getAllUsersThunk, getTaskListThunk } from '../../redux/project/thunks';
import CreateAndFilterProject from './components/CreateAndFilterProject';
import { getIsLoading, projectRemaninng } from '../../redux/project/selector';
import { IProject } from '../../redux/project/interface';
import ProjectByClient from './components/ProjectByClient';

import ModalCreateProject from './components/ModalCreateProject';
import { getAllCustomer } from '../../redux/customer/thunks';
import ViewModal from '../view/ViewModal';
export default function Project (): JSX.Element {
  const dispatch = useAppDispatch();
  const projectList = useSelector(projectRemaninng);
  const isLoading = useSelector(getIsLoading);
  const [loadingBySearch, setLoadingBySearch] = useState(false);
  useEffect(() => {
    void dispatch(getAllUsersThunk());
    void dispatch(getAllCustomer());
    void dispatch(getTaskListThunk());
  }, []);
  const customerList = new Set(
    projectList.map((project) => project.customerName)
  );
  const customerProjectList: IProject[][] = [];
  customerList.forEach((customer) => {
    const list = projectList.filter(
      (project) => project.customerName === customer
    );
    customerProjectList.push(list);
  });
  // DIVIDE BY LIST CLIENT
  return (
    <div className='project' >
      <Row className="project-header">
        <Col span={24}>
          <HeaderContent title='Project Management' />
        </Col>
      </Row>
      <Row className="project-handle">
        <Col span={24}>
          <CreateAndFilterProject
            setLoadingBySearch={setLoadingBySearch}
          />
        </Col>
      </Row>
          <ModalCreateProject/>
          <ViewModal />
      <Row className="project-item">
        <Col span={24}>
          { isLoading || loadingBySearch
            ? <Skeleton active={true} />
            : customerProjectList.map(
              (projectListByCustomer, index) => (
                <ProjectByClient
                  key={index}
                  projectListByCustomer={projectListByCustomer}
                />
              ))
          }
        </Col>
      </Row>
    </div>
  );
}
