/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { memo, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IProjectForm } from '../../../redux/project/interface';
import { getOpenCreateModal, getProjectEdit, getSelectedTaskList, memberSelectedRemaining } from '../../../redux/project/selector';
import { useSelector } from 'react-redux';
import { EMemberType, EProjectType, EStatusProjectForm } from '../../../redux/project/enum.user';
import { addProjectThunk, getAllUsersThunk, getTaskListThunk, editProjectThunk, getAllProject, getProjectEditing } from '../../../redux/project/thunks';
import { useAppDispatch, useToast } from '../../../hooks/useToast';
import { changeCreateOpenModal, clearSelectedTaskList, clearSelectedUserList } from '../../../redux/project/slice';
import LinkTab from './LinkTab';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { getAllCustomer } from '../../../redux/customer/thunks';

function ModalCreateProject (): JSX.Element {
  const isOpen = useSelector(getOpenCreateModal);
  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    customerId: yup.number().required('Choose any client').default(null),
    name: yup.string().required('Name is required'),
    code: yup.string().required('Code is required'),
    timeStart: yup.date().required(),
    timeEnd: yup.date().required().min(
      yup.ref('timeStart'),
      "end date can't be before started"
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
  const findPM = listMemberSelected.find(member => member.memberType === EMemberType.ProjectManager);
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
    if (selectedtaskList.length === 0) {
      useToast('You must have at least one task', 2);
      navigate('/App/project/Create/task');
    } else if (listMemberSelected.length === 0) {
      useToast('You must have at least one member', 2);
      navigate('/App/project/Create/team');
    } else if (!findPM) {
      useToast('You must have at least one PM', 2);
      navigate('/App/project/Create/team');
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
      void dispatch(getAllProject({ status: '0', search: null }));
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
  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      void dispatch(getProjectEditing(Number(id)));
      void dispatch(getAllUsersThunk());
      void dispatch(getAllCustomer());
      void dispatch(getTaskListThunk());
      navigate(`/App/project/Edit/${id}`);
    }
  }, [id]);
  return (
    <FormProvider {...methods} >
      <form id='myform' onSubmit={handleSubmit(onSubmit)} >
      <Modal
        onCancel={handleCloseModal}
        className='project-modal'
        title={ projectEditing != null ? `Edit Project: ${projectEditing.name}` : 'Create Project'}
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
export default memo(ModalCreateProject);
