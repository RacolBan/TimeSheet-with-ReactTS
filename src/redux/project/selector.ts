/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSelector } from '@reduxjs/toolkit';
import { EBranchUser, ETypeUser } from './enum.user';
import { IProjectReducerRef } from './interface';
const getOpenCreateModal = (state: IProjectReducerRef) => state?.projectReducer.openCreateModal;
const getfilterStatus = (state: IProjectReducerRef) => state?.projectReducer.filterStatus;
const getProjectList = (state: IProjectReducerRef) => state?.projectReducer.projectList;
const getSearchInput = (state: IProjectReducerRef) => state?.projectReducer.searchProjectInput;
const getMemberList = (state: IProjectReducerRef) => state?.projectReducer.userList;
const getFilterUnSelectedMember = (state: IProjectReducerRef) => state.projectReducer.filterUnSelectedUserList;
const getSelectedUserList = (state: IProjectReducerRef) => state.projectReducer.selectedUserList;
const getSearchSelectedMember = (state: IProjectReducerRef) => state.projectReducer.searchMemberSelected;
const getIsShowDeactive = (state: IProjectReducerRef) => state.projectReducer.isShowDeactive;
const getSelectedTaskList = (state: IProjectReducerRef) => state.projectReducer.selectedTaskList;
const getUnSelectedTaskList = (state: IProjectReducerRef) => state.projectReducer.unSelectedTaskList;
const getIsAllBillable = (state: IProjectReducerRef) => state.projectReducer.isAllBillable;
const getIsKomuNoti = (state: IProjectReducerRef) => state.projectReducer.isKomuNoti;
const getKomuChannelId = (state: IProjectReducerRef) => state.projectReducer.komuChannelId;
const getIsLoading = (state: IProjectReducerRef) => state.projectReducer.isLoading;
const getProjectEdit = (state: IProjectReducerRef) => state.projectReducer.projectEditing;
const getViewProject = (state: IProjectReducerRef) => state.projectReducer.viewProject;
const getTimeSheetTask = (state: IProjectReducerRef) => state.projectReducer.timeSheetStatisticTasks;
const getTimeSheetTeam = (state: IProjectReducerRef) => state.projectReducer.timeSheetStatisticTeams;
const getPage = (state: IProjectReducerRef) => state.projectReducer.page;
const projectRemaninng = createSelector(getProjectList, getSearchInput, (projectList, search) => {
  return projectList.filter(
    project => {
      return project.customerName.toLowerCase().includes(search) || project.name.toLowerCase().includes(search);
    }
  );
});
const memberRemaining = createSelector(getMemberList, getFilterUnSelectedMember, getPage, (memberList, filterUnSelected, page) => {
  return memberList.filter((member, index) => {
    return (member.branch === filterUnSelected.branch || filterUnSelected.branch === EBranchUser.All) &&
    (member.type === filterUnSelected.type || filterUnSelected.type === ETypeUser.All) &&
    member.name.toLowerCase().includes(filterUnSelected.search) &&
    (index >= (page - 1) * 100 && index <= page * 100 - 1);
  });
});

const memberSelectedRemaining = createSelector(getSelectedUserList, getSearchSelectedMember, getIsShowDeactive, (memberSelectedList, search, isShow) => {
  return memberSelectedList.filter(member => {
    if (isShow) {
      return member.name.toLowerCase().includes(search);
    }
    return member.memberType !== 3 && member.name.includes(search);
  });
});
export { projectRemaninng, getfilterStatus, memberRemaining, getSelectedUserList, memberSelectedRemaining, getSelectedTaskList, getUnSelectedTaskList, getIsAllBillable, getIsKomuNoti, getKomuChannelId, getIsLoading, getProjectEdit, getViewProject, getTimeSheetTask, getTimeSheetTeam, getOpenCreateModal, getPage };
