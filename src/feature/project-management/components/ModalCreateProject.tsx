/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect } from 'react';
import { Modal, Button } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IProjectForm } from '../../../redux/project/interface';
import { getOpenCreateModal, getProjectEdit, getSelectedTaskList, memberSelectedRemaining } from '../../../redux/project/selector';
import { useSelector } from 'react-redux';
import { EProjectType, EStatusProjectForm } from '../../../redux/project/enum.user';
import { addProjectThunk, editProjectThunk, getAllProject } from '../../../redux/project/thunks';
import { useAppDispatch, useToast } from '../../../hooks/useToast';
import { changeCreateOpenModal, clearSelectedTaskList, clearSelectedUserList } from '../../../redux/project/slice';
import LinkTab from './LinkTab';
import { Outlet, useNavigate } from 'react-router-dom';

export default function ModalCreateProject (): JSX.Element {
  const isOpen = useSelector(getOpenCreateModal);
  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    customerId: yup.number().required('Choose any client').default(null),
    name: yup.string().required('Name is required'),
    code: yup.string().required('Code is required'),
    timeStart: yup.date().required(),
    timeEnd: yup.date().required().min(
      yup.ref('timeStart'),
      "end date can't be before start date"
    ),
    projectType: yup.number().required('ProjectType is required')
  });
  const defaultValues = {
    name: '',
    customerId: null,
    code: '',
    timeStart: null,
    timeEnd: null,
    note: '',
    isAllUserBelongTo: false,
    projectType: EProjectType.TM,
    isNotifyToKomu: false,
    komuChannelId: ''
  };
  const listMemberSelected = useSelector(memberSelectedRemaining);
  const selectedtaskList = useSelector(getSelectedTaskList);
  const taskListPost = selectedtaskList.map((task) => ({
    taskId: task.id,
    billable: task.isBillable
  }));
  const userListPost = listMemberSelected.map((user) => ({
    userId: (user.userId != null) ? user.userId : user.id,
    type: user.memberType
  }));
  const projectTargetUsers = listMemberSelected.map(user => {
    return {
      userId: (user.userId != null) ? user.userId : user.id,
      roleName: user.roleName ?? null,
      id: user.id
    };
  });
  const methods = useForm<IProjectForm>({
    resolver: yupResolver(schema),
    defaultValues
  });
  const projectEditing = useSelector(getProjectEdit);
  const { handleSubmit, reset, formState: { errors } } = methods;
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      navigate('/App/project/Create/general');
    }
  }, [errors]);
  const onSubmit = (data: IProjectForm): void => {
    console.log(data);
    if (selectedtaskList.length === 0) {
      useToast('You must have at least one task', 2);
    } else if (listMemberSelected.length === 0) {
      useToast('You must have at least one member', 2);
    } else {
      const project = {
        name: data.name,
        code: data.code,
        status: EStatusProjectForm.Active,
        timeStart: new Date((data.timeStart != null) ? data.timeStart : '').toISOString(),
        timeEnd: new Date((data.timeEnd != null) ? data.timeEnd : '').toISOString(),
        note: data.note,
        projectType: data.projectType,
        customerId: data.customerId,
        tasks: taskListPost,
        users: userListPost,
        projectTargetUsers,
        isAllUserBelongTo: data.isAllUserBelongTo,
        komuChannelId: data.komuChannelId,
        isNotifyToKomu: data.isNotifyToKomu
      };
      if (projectEditing != null) {
        void dispatch(editProjectThunk({ ...project, id: projectEditing.id }));
      } else {
        void dispatch(addProjectThunk(project));
      }
      void dispatch(getAllProject('0'));
      handleCloseModal();
    }
  };
  const navigate = useNavigate();
  const handleCloseModal = (): void => {
    dispatch(clearSelectedUserList());
    dispatch(clearSelectedTaskList());
    reset(defaultValues);
    dispatch(changeCreateOpenModal());
    navigate('/App/project');
  };
  return (
    <FormProvider {...methods} >
      <form id='myform' onSubmit={handleSubmit(onSubmit)} >
      <Modal
        onCancel={handleCloseModal}
        className='project-modal'
        title={ projectEditing != null ? 'Edit Project' : 'Create Project'}
        open={ isOpen }
        footer={[
          <Button key='back' onClick={() => handleCloseModal()} >Cancel</Button>
        ]}
      >
        <LinkTab projectEditing={projectEditing} />
        <Outlet />
        <button className='btn-modal-create' form='myform' type='submit'>Save</button>
      </Modal>
      </form>
    </FormProvider>
  );
}
