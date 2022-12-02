import React from 'react';
import { Typography, Col, Row } from 'antd';
import { IProject } from '../../../redux/project/interface';
import ProjectItem from './ProjectItem';
interface Props {
  projectListByCustomer: IProject[]
}
export default function ProjectByClient ({ projectListByCustomer }: Props): JSX.Element {
  return (
    <Row>
      <Col span={24} className='row-client' >
        <Typography.Text className='row-client-text'>{ projectListByCustomer[0].customerName }</Typography.Text>
      </Col>
        { projectListByCustomer.map((project: IProject, index) => (
          <Col key={index} span={24}>
            <ProjectItem
            project={project}
            />
          </Col>
        ))}
    </Row>
  );
}
