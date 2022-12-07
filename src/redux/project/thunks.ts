/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axiosClient from '../../api/api.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetTimeSheetProject, IProjectForm } from './interface';
import { useToast } from '../../hooks/useToast';
interface Query {
  status: string | null
  search: string | null
}
export const getAllProject = createAsyncThunk('getAllProject',
  async (query: Query) => {
    try {
      const { data } = await axiosClient.get('/api/services/app/Project/GetAll', {
        params: query
      });
      return data.result;
    } catch (error) {
      useToast(error.response.data.error.message, 3);
    }
  });
export const activeProjectThunk = createAsyncThunk(
  'projects/activeProject',
  async (id: number) => {
    try {
      const { data } = await axiosClient.post('/api/services/app/Project/Active', {
        id
      });
      useToast('Item is active', 1);
      return { id, data };
    } catch (error) {
      useToast(error.response.data.error.message, 3);
    }
  }
);
export const getTaskListThunk = createAsyncThunk(
  'tasks/getTaskList',
  async () => {
    try {
      const { data } = await axiosClient.get('/api/services/app/Task/GetAll');
      return data.result;
    } catch (error) {
      useToast(error.response.data.error.message, 3);
    }
  }
);
export const deActiveProjectThunk = createAsyncThunk(
  'projects/deActiveProject',
  async (id: number) => {
    try {
      const { data } = await axiosClient.post('/api/services/app/Project/Inactive', {
        id
      });
      useToast('Item is inactive', 1);
      return { id, data };
    } catch (error) {
      useToast(error.response.data.error.message, 3);
    }
  }
);
export const deleteProjectThunk = createAsyncThunk(
  'projects/deleteProject',
  async (id: number) => {
    try {
      const { data } = await axiosClient.delete(
        `/api/services/app/Project/Delete?Id=${id}`
      );
      useToast('delete sucessfully', 1);
      return { id, data };
    } catch (error) {
      useToast(error.response.data.error.message, 3);
    }
  }
);

export const getAllUsersThunk = createAsyncThunk('users/getAll', async () => {
  const { data } = await axiosClient.get(
    '/api/services/app/User/GetUserNotPagging'
  );
  return data.result;
});

export const addProjectThunk = createAsyncThunk(
  'projects/addProject',
  async (project: IProjectForm) => {
    try {
      const { data } = await axiosClient.post(
        '/api/services/app/Project/Save',
        project
      );
      useToast('Create successfully', 1);
      return data.result;
    } catch (error) {
      useToast(error.response.data.error.message, 3);
    }
  }
);

export const editProjectThunk = createAsyncThunk(
  'projects/editProject',
  async (project: IProjectForm) => {
    try {
      const { data } = await axiosClient.post(
        '/api/services/app/Project/Save',
        project
      );
      useToast('Edit successfully', 1);
      return data.result;
    } catch (error) {
      useToast(error.response.data.error.message, 3);
    }
  }
);

export const getProjectEditing = createAsyncThunk(
  'projects/getProject',
  async (id: number) => {
    try {
      const { data } = await axiosClient.get(
        `/api/services/app/Project/Get?input=${id}`
      );
      return data.result;
    } catch (error) {
      useToast(error.response.data.error.message, 3);
    }
  }
);
export const getTimeSheetStatisticTasksThunk = createAsyncThunk(
  'projects/getTimeSheetStatisticTasks',
  async (project: IGetTimeSheetProject) => {
    try {
      const response = await axiosClient.get(
        `/api/services/app/TimeSheetProject/GetTimeSheetStatisticTasks?projectId=${project.id}&startDate=${project.start}&endDate=${project.end}`
      );
      return response.data.result;
    } catch (error) {
      useToast(error.response.data.error.message, 3);
    }
  }
);

export const getTimeSheetStatisticTeamsThunk = createAsyncThunk(
  'projects/getTimeSheetStatisticTeams',
  async (project: IGetTimeSheetProject) => {
    try {
      const response = await axiosClient.get(
        `/api/services/app/TimeSheetProject/GetTimeSheetStatisticTeams?projectId=${project.id}&startDate=${project.start}&endDate=${project.end}`
      );
      return response.data.result;
    } catch (error) {
      useToast(error.response.data.error.message, 3);
    }
  }
);
