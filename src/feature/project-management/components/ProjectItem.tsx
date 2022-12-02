/* eslint-disable no-void */
import React, { useState } from 'react';
import { Typography, Col, Row } from 'antd';
import { IProject } from '../../../redux/project/interface';
import moment from 'moment';
import { EProjectType } from '../../../redux/project/enum.user';
import { useAppDispatch } from '../../../hooks/useToast';
import { activeProjectThunk, deActiveProjectThunk, deleteProjectThunk, getProjectEditing } from '../../../redux/project/thunks';
import MenuAction from './MenuAction';
import { changeCreateOpenModal, changeViewProject } from '../../../redux/project/slice';
import ConfirmModal from './ConfirmModal';
import { useNavigate } from 'react-router-dom';
interface Props {
  project: IProject
}
export default function ProjectItem ({ project }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [typeModal, setTypeModal] = useState<number | null>(null);
  let pms = '';
  project.pms.forEach((item: string, index) => {
    pms += index === 0 ? item : `, ${item}`;
  });
  const customDate = (): string => {
    let date = '';
    const timeStart = project.timeStart;
    const timeEnd = project.timeEnd;
    if (timeStart !== '') date += moment(timeStart).format('L');
    if ((Boolean(date)) && (Boolean(timeEnd))) date += ' - ';
    if (timeEnd !== '') date += moment(timeEnd).format('L');
    return date;
  };
  const convertToType = (): string => {
    switch (project.projectType) {
      case EProjectType.TM:
        return 'T&M';
      case EProjectType.FF:
        return 'FF';
      case EProjectType.NB:
        return 'NB';
      case EProjectType.ODC:
        return 'ODC';
      case EProjectType.P:
        return 'P';
      case EProjectType.T:
        return 'T';
      default: return '';
    }
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleOpenModalEdit = (): void => {
    void dispatch(getProjectEditing(project.id));
    dispatch(changeCreateOpenModal());
    navigate(`/App/project/Edit/${project.id}`);
  };
  const handleOpenView = (): void => {
    dispatch(changeViewProject((project.id).toString()));
  };
  const handleOpenDialog = (type: number): void => {
    setIsOpen(true);
    setTypeModal(type);
  };
  const handleCancelDialog = (): void => {
    setIsOpen(false);
  };

  const handleConfirmDialog = (): void => {
    setIsOpen(false);
    if (typeModal === 1) {
      void dispatch(deleteProjectThunk(project.id));
    } else {
      project.status === 0
        ? void dispatch(deActiveProjectThunk(project.id))
        : void dispatch(activeProjectThunk(project.id));
    }
  };
  return (
    <Row>
      <Col span={24} className='flex'>
        <div className='projectItem' >
          <Typography.Text className='text-name' >{ project.name } </Typography.Text>
          <Typography.Text className='text-pms' >{ pms } </Typography.Text>
          <Typography.Text className='text-members' >{ project.activeMember > 1 ? `${project.activeMember} members` : `${project.activeMember} member`} </Typography.Text>
          <Typography.Text className={convertToType() === '' ? 'text-none' : 'text-type'} >{convertToType()} </Typography.Text>
          <Typography.Text className='text-date' >{ customDate() } </Typography.Text>
        </div>
        <div className='projectAction'>
          <div className='projectAction-item'>Actions</div>
          <div className='projectAction-hide'>
            <MenuAction status={project.status} handleOpenView={handleOpenView} handleOpenModalEdit={handleOpenModalEdit} handleOpenDialog={handleOpenDialog} />
          </div>
        </div>
      </Col>
      <ConfirmModal open={isOpen} title={typeModal === 0
        ? (project.status === 0 ? 'Deactive Item' : 'Active Item')
        : 'Delete Item' }
      handleOk={handleConfirmDialog} handleCancel={handleCancelDialog}/>
    </Row>
  );
}
