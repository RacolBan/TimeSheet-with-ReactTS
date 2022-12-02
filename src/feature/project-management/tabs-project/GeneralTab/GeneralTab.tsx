import React, { useEffect, useState } from 'react';
import { Input, Select, Radio, Button, Row, Col, Checkbox, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { ICustomerRef } from '../../../../redux/customer/customer.interface';
import { Controller, useFormContext } from 'react-hook-form';
import ModalCreateClient from './ModalCreateClient';
import { IProjectForm } from '../../../../redux/project/interface';
import { getProjectEdit } from '../../../../redux/project/selector';
const arrProjectType = [
  { key: 1, type: 'Time&Materials', value: 0 },
  { key: 2, type: 'Fixed Fee', value: 1 },
  { key: 3, type: 'Non-Billable', value: 2 },
  { key: 4, type: 'ODC', value: 3 },
  { key: 5, type: 'Product', value: 4 },
  { key: 6, type: 'Training', value: 5 }
];

function General (): JSX.Element {
  const projectEditing = useSelector(getProjectEdit);
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOpen = (): void => {
    setIsOpen(true);
  };
  const {
    control,
    formState: { errors },
    reset
  } = useFormContext<IProjectForm>();
  useEffect(() => {
    if (projectEditing != null) {
      reset({
        name: projectEditing.name,
        customerId: projectEditing.customerId,
        code: projectEditing.code,
        timeStart: projectEditing.timeStart?.split('T')[0],
        timeEnd: projectEditing.timeEnd?.split('T')[0],
        note: projectEditing.note,
        isAllUserBelongTo: projectEditing.isAllUserBelongTo,
        projectType: projectEditing.projectType
      });
    }
  }, [projectEditing, reset]);
  const clientList = useSelector((state: ICustomerRef) => state.customerReducer.customerList);
  return (
    <div className='general' >
      <Row>
        <Col span={14}>
          <Typography.Text className='text-client'>Client<span className='sao'>*</span></Typography.Text>
          <Controller
            name='customerId'
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Select
                onChange={field.onChange}
                value={field.value}
                placeholder='Choose a client...'
                style={{
                  width: '80%',
                  padding: '0 0 0 87px'
                }}
              >
                {clientList.map(client => (
                  <Select.Option key={client.id} value={client.id} >
                    {client.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
        </Col>
        <Col span={3} offset={1}>
          <Button type='primary' onClick={handleClickOpen}><span className='general-create-text'>+ New Client</span> <span className='general-create-plus'>+</span> </Button>
        </Col>
        <Col offset={3} span={18}>
        {errors.customerId != null ? <div className='error'>{errors.customerId.message}</div> : <div className='error'> <br /></div>}
        </Col>
      </Row>
      <Row>
        <Col><Typography.Text>Name<span className='sao'>*</span></Typography.Text></Col>
        <Col span={14}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <Input {...field}
                style={{
                  width: '67%',
                  margin: '0px 0px 0px 85px',
                  height: '50px'
                }}
                placeholder='Project name...'
              />
            )}
          />
        </Col>
        <Col offset={3} span={18}>
        {errors.name != null ? <div className='error'>{errors.name.message}</div> : <div className='error'> <br /></div>}
        </Col>
      </Row>
      <Row>
        <Col><Typography.Text>Code<span className='sao'>*</span></Typography.Text></Col>
        <Col span={8}>
          <Controller
            name='code'
            control={control}
            render={({ field }) => (
              <Input {...field} style={{
                width: '74%',
                margin: '0px 0px 0px 90px',
                height: '50px'
              }} placeholder='Project code...' />
            )}
          />
        </Col>
        <Col offset={3} span={18}>
        {errors.code != null ? <div className='error'>{errors.code.message}</div> : <div className='error'><br /></div> }
        </Col>
      </Row>
      <Row>
        <Col><Typography.Text>Time Start<span className='sao'>*</span></Typography.Text></Col>
        <Col span={5} >
          <Controller
            name='timeStart'
            control={control}
            render={({ field }) => (
              <input type='date' value={field.value ?? ''} style={{
                width: '74%',
                margin: '0px 0px 0px 50px',
                height: '50px'
              }} placeholder='Start at' onChange={field.onChange} />
            )}
          />
        </Col>
        <Col offset={1}><Typography.Text>To</Typography.Text></Col>
        <Col span={5} >
          <Controller
            name='timeEnd'
            control={control}
            render={({ field }) => (
              <input type='date' value={field.value ?? ''} style={{
                width: '74%',
                margin: '0px 0px 22px 50px',
                height: '50px'
              }} placeholder='End at' onChange={field.onChange} />
            )}
          />
        </Col>
      </Row>
      <Row className='row-error-date'>
          <Col offset={3} span={4}>
          {errors.timeStart != null ? <div className='error'>{errors.timeStart.message}</div> : <div className='error'><br /></div> }
          </Col>
          <Col offset={2} span={4}>
          {errors.timeEnd != null ? <div className='error timeEnd'>{errors.timeEnd.message}</div> : <div className='error'><br /></div> }
          </Col>
        </Row>
      <Row>
        <Col span={3}><Typography.Text>Note</Typography.Text></Col>
        <Col span={10} >
          <Controller
            name='note'
            control={control}
            render={({ field }) => (
              <Input.TextArea value={field.value ?? ''} rows={4} onChange={field.onChange} placeholder='Write something...' />
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col><Typography.Text>All User</Typography.Text></Col>
        <Col className='modal-checkbox-alluser'>
          <Controller
            control={control}
            name="isAllUserBelongTo"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                onChange={onChange} // send value to hook form
                checked={value}
                defaultChecked={false}
                 >Auto add user as a member of this project when creating new user</Checkbox>
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col><Typography.Text>Project Type<span className='sao'>*</span></Typography.Text></Col>
        <Col className='ant-col-projectType'>
          <Controller
            name='projectType'
            render={({ field }) => (
              <Radio.Group {...field} value={field.value} style={{ margin: '0 0 0 35px' }} buttonStyle='solid' >
                {arrProjectType.map(ProjectType => (
                  <Radio.Button style={{ width: '11em', height: '4em', lineHeight: '50px' }} key={ProjectType.key} value={ProjectType.value}>{ProjectType.type}</Radio.Button>
                ))}
              </Radio.Group>
            )}
          />
        </Col>
        <Col offset={3} span={4}>
        {errors.projectType != null ? <div className='error'>{errors.projectType.message}</div> : <div className='error'><br /></div> }
        </Col>
      </Row>
      <ModalCreateClient isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
export default General;
