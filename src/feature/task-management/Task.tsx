import React from 'react';
import { Button, Input, Select, Tag, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { HeaderContent } from '../../components/HeaderContent';
export default function Task (): JSX.Element {
  return (
    <div className='project' >
      <Row className="project-project">
        <Col span={24}>
          <HeaderContent title='Task Management' />
        </Col>
      </Row>

      <Row className="project-action">
        <Col span={5}>
          <Button block={true} type='primary'> + &nbsp;New Content</Button>
        </Col>
        <Col span={7}>
          <Select defaultValue='Active Project(63)' size='large' >
            <Select.Option value='Active' label='Active'>
              <Tag color='red'>Active</Tag>
            </Select.Option>
            <Select.Option value='DeActive' label='DeActive'>
              <Tag color='blue'>DeActive</Tag>
            </Select.Option>
            <Select.Option value='All' label='All'>
              <Tag color='gray'>All</Tag>
            </Select.Option>
          </Select>
        </Col>
        <Col span={12}>
          <Input placeholder='Search by client or project name' prefix={<SearchOutlined />} />
        </Col>
      </Row>
    </div>
  );
}
