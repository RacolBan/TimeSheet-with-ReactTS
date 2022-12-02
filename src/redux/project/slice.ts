import { EBranchUser, EMemberType, EStatusProject, ETypeUser, ISelectedTask } from './enum.user';
import { createSlice } from '@reduxjs/toolkit';
import { IProjectReducer, ISelectedUser } from './interface';
import { deleteProjectThunk, getAllProject, getAllUsersThunk, getProjectEditing, getTaskListThunk, getTimeSheetStatisticTasksThunk, getTimeSheetStatisticTeamsThunk } from './thunks';
import { useToast } from '../../hooks/useToast';

const initialState: IProjectReducer = {
  openCreateModal: false,
  projectList: [],
  filterStatus: EStatusProject.Active,
  searchProjectInput: '',
  userList: [],
  selectedUserList: [],
  filterUnSelectedUserList: {
    branch: EBranchUser.All,
    type: ETypeUser.All,
    search: ''
  },
  isLoading: false,
  searchMemberSelected: '',
  isShowDeactive: true,
  isAllBillable: true,
  projectEditing: null,
  taskList: [],
  selectedTaskList: [],
  unSelectedTaskList: [],
  isKomuNoti: false,
  komuChannelId: '',
  viewProject: {
    id: '0',
    isView: false
  },
  page: 1,
  timeSheetStatisticTasks: [],
  timeSheetStatisticTeams: []
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    changeCreateOpenModal: (state) => {
      state.openCreateModal = !state.openCreateModal;
    },
    changeFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    changeSearchProject: (state, action) => {
      state.searchProjectInput = action.payload;
    },
    selectMember: (state, action) => {
      if (state.selectedUserList.length === 0) {
        state.selectedUserList.unshift({
          ...action.payload,
          memberType: EMemberType.ProjectManager
        });
      } else {
        state.selectedUserList.unshift({
          ...action.payload,
          memberType: EMemberType.Member
        });
      }
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload.id
      );
    },
    deSelectMember: (state, action) => {
      state.selectedUserList = state.selectedUserList.filter(user => user.id !== action.payload.id);
      state.userList = [action.payload, ...state.userList];
    },
    changeViewProject: (state, action) => {
      state.viewProject = { ...state, isView: true, id: action.payload };
    },
    closeViewProject: state => {
      state.viewProject.isView = false;
    },
    changeFilterUnSelectedUserList: (state, action) => {
      state.filterUnSelectedUserList = action.payload;
    },
    changeSearchSelectedMember: (state, action) => {
      state.searchMemberSelected = action.payload;
    },
    changeMemberTypeUser: (state, action) => {
      const user = state.selectedUserList.find(
        (user) => user.id === action.payload.id
      );
      if (user != null) user.memberType = action.payload.memberType;
    },
    changeIsShowDeactive: (state, action) => {
      state.isShowDeactive = action.payload;
    },
    filterSelectedTask: (state) => {
      const taskList = state.taskList;
      state.unSelectedTaskList = taskList.filter((task) => task.type !== 0);
      state.selectedTaskList = taskList.filter((task) => task.type === 0);
      state.selectedTaskList = state.selectedTaskList.map(task => {
        return { ...task, isBillable: true };
      });
    },
    selectedTask: (state, action) => {
      state.selectedTaskList.push({ ...action.payload, isBillable: true });
      state.unSelectedTaskList = state.unSelectedTaskList.filter(task => task.id !== action.payload.id);
    },
    deSelectedTask: (state, action) => {
      state.unSelectedTaskList = [action.payload, ...state.unSelectedTaskList];
      state.selectedTaskList = state.selectedTaskList.filter(task => task.id !== action.payload.id);
    },
    changeBillable: (state, action) => {
      const task = state.selectedTaskList.find(
        (task) => task.id === action.payload
      );
      if (task != null) {
        task.isBillable = !task.isBillable;
      }
    },
    changeAllBillable: (state) => {
      state.isAllBillable = !state.isAllBillable;
      state.selectedTaskList = state.selectedTaskList.map(task => { return { ...task, isBillable: state.isAllBillable }; }
      );
    },
    clearSelectedUserList: (state) => {
      state.selectedUserList = [];
      state.projectEditing = null;
    },
    clearSelectedTaskList: state => {
      state.selectedTaskList = [];
    },
    changePage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAllProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectList = action.payload;
      })
      .addCase(getAllProject.rejected, () => {
        useToast('Get project failed', 3);
      });
    builder
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.userList = action.payload;
      });
    builder
      .addCase(getTaskListThunk.fulfilled, (state, action) => {
        state.taskList = action.payload;
      });
    builder
      .addCase(deleteProjectThunk.fulfilled, (state, action) => {
        state.projectList = state.projectList.filter(
          (project) => project.id !== action.payload.id
        );
        useToast('delete sucessfully', 1);
      })
      .addCase(deleteProjectThunk.rejected, () => {
        useToast('delete failed', 3);
      });
    builder
      .addCase(getProjectEditing.fulfilled, (state, action) => {
        state.projectEditing = action.payload;
        action.payload.tasks.forEach((selectedTask: ISelectedTask) => {
          const task = state.taskList.find(unSelectedTask => unSelectedTask.id === selectedTask.taskId);
          if (task != null) {
            state.selectedTaskList.push({ ...task, isBillable: selectedTask.billable, taskId: selectedTask.taskId });
            state.taskList = state.taskList.filter(unSelectedTask => unSelectedTask.id !== task.id);
          }
        });
        action.payload.users.forEach((selectedUser: ISelectedUser) => {
          const user = state.userList.find(unSelectedUser => unSelectedUser.id === selectedUser.userId);
          if (user != null) {
            state.selectedUserList.push({ ...user, memberType: selectedUser.type, userId: selectedUser.userId });
            state.userList = state.userList.filter(unSelectedUser => unSelectedUser.id !== user.id);
          }
        });
      })
      .addCase(getProjectEditing.rejected, () => {
        useToast('Not get project to edit', 3);
      });
    builder.addCase(getTimeSheetStatisticTasksThunk.fulfilled, (state, action) => {
      state.timeSheetStatisticTasks = action.payload;
    });

    builder.addCase(getTimeSheetStatisticTeamsThunk.fulfilled, (state, action) => {
      state.timeSheetStatisticTeams = action.payload;
    });
  }
});
export const projectReducer = projectSlice.reducer;
export const { changeFilterStatus, changeAllBillable, changeSearchProject, changePage, selectMember, changeFilterUnSelectedUserList, deSelectMember, changeMemberTypeUser, changeSearchSelectedMember, changeIsShowDeactive, deSelectedTask, selectedTask, filterSelectedTask, changeBillable, clearSelectedUserList, clearSelectedTaskList, changeViewProject, closeViewProject, changeCreateOpenModal } = projectSlice.actions;
