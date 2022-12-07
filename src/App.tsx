import React, { FC } from 'react';
import TimeSheet from './feature/home';
import { Routes, Route, Navigate } from 'react-router-dom';
import './sass/main.scss';
import Login from './feature/login/Login';
import Project from './feature/project-management/Project';
import ModalCreateProject from './feature/project-management/components/ModalCreateProject';
import 'react-toastify/dist/ReactToastify.css';
import General from './feature/project-management/components/tabs-project/GeneralTab/GeneralTab';
import TeamProject from './feature/project-management/components/tabs-project/TeamTab/TeamTab';
import TaskTab from './feature/project-management/components/tabs-project/TaskTab/TaskTab';
import NotiTab from './feature/project-management/components/tabs-project/notiTab/NotiTab';
import Redirect from './components/Redirect';
import NotFound from './components/NotFound';
const App: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/App' replace={true} />} />
      <Route path='/App/login' element={<Redirect path={'/App'} element={ <Login/>} />}/>
      <Route path='*' element={<NotFound/>}/>
      <Route element={<Redirect path={'/App/login'} element={ <TimeSheet/>} />} path='App' >
        <Route index element={<Project />} />
        <Route path='/App/project' element={<Project />} />
      </Route>
      <Route element={<ModalCreateProject />} path='App/project/Create' >
        <Route index element={<General />} />
        <Route path='/App/project/Create/general' element={<General />} />
        <Route path='/App/project/Create/team' element={<TeamProject />}>
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
