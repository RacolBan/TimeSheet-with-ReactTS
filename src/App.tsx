import React, { FC, useEffect } from 'react';
import TimeSheet from './feature/home';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './sass/main.scss';
import Login from './feature/login/Login';
import Project from './feature/project-management/Project';
import Task from './feature/task-management/Task';
// import Redirect from './hooks/hooks';
import { useSelector } from 'react-redux';
import { IAuthReducer } from './redux/auth/login.interface';
import General from './feature/project-management/tabs-project/GeneralTab/GeneralTab';
import TeamProject from './feature/project-management/tabs-project/TeamTab/TeamTab';
import TaskTab from './feature/project-management/tabs-project/TaskTab/TaskTab';
import NotiTab from './feature/project-management/tabs-project/notiTab/NotiTab';
import ModalCreateProject from './feature/project-management/components/ModalCreateProject';
import 'react-toastify/dist/ReactToastify.css';
const App: FC = () => {
  const navigate = useNavigate();
  const token = useSelector((state: IAuthReducer) => state.authReducer.accessToken) ?? '';
  useEffect((): void => {
    if (token.length > 0) {
      return navigate('/');
    }
    navigate('/login');
  }, [token]);

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/App' replace={true} />} />
      <Route element={<TimeSheet />} path='App' >
        <Route index element={<Project />} />
        <Route path='/App/project' element={<Project />} />
        <Route path='/App/task' element={<Task />} />
      </Route>
      <Route element={<Login />} path='/login' />
      <Route element={<ModalCreateProject />} path='App/project/Create' >
        <Route index element={<General />} />
        <Route path='/App/project/Create/general' element={<General />} />
        <Route path='/App/project/Create/team' element={<TeamProject />}>
          <Route index path='/App/project/Create/team/:page' element={<TeamProject />}/>
          <Route path='/App/project/Create/team/:page' element={<TeamProject />}/>
        </Route>
        <Route path='/App/project/Create/task' element={<TaskTab />} />
        <Route path='/App/project/Create/noti' element={<NotiTab />} />
      </Route>
      <Route element={<ModalCreateProject />} path='App/project/Edit/:id' >
        <Route index element={<General />} />
        <Route path='/App/project/Edit/:id/general' element={<General />} />
        <Route path='/App/project/Edit/:id/team' element={<TeamProject />} />
        <Route path='/App/project/Edit/:id/task' element={<TaskTab />} />
        <Route path='/App/project/Edit/:id/noti' element={<NotiTab />} />
      </Route>
    </Routes>
  );
};

export default App;
