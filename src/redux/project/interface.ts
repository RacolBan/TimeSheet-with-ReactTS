import { EBranchUser, EMemberType, EProjectType, EStatusProject, EStatusProjectForm, ETypeUser, ITask } from './enum.user';

export interface IProject {
  customerName: string
  name: string
  code: string
  status: EStatusProjectForm
  pms: string[]
  activeMember: number
  projectType: EProjectType
  timeStart: string
  timeEnd: string
  id: number
}
export interface IProjectState {
  projectList: IProject[]
}
export interface IProjectReducer {
  openCreateModal: boolean
  projectList: IProject[]
  filterStatus: EStatusProject
  isAllBillable: boolean
  searchProjectInput: string
  userList: IUser[]
  selectedUserList: IUser[]
  searchMemberSelected: string
  filterUnSelectedUserList: {
    branch: EBranchUser
    type: ETypeUser
    search: string
  }
  page: number
  isLoading: boolean
  isShowDeactive: boolean
  projectEditing: IProjectForm | null
  taskList: ITask[]
  selectedTaskList: ITask[]
  unSelectedTaskList: ITask[]
  isKomuNoti: boolean
  komuChannelId: string
  viewProject: {
    id: string
    isView: boolean
  }
  timeSheetStatisticTasks: []
  timeSheetStatisticTeams: []
}
export interface IProjectReducerRef {
  projectReducer: IProjectReducer
}
export interface IUser {
  name: string
  emailAddress: string
  isActive: true
  type: number
  jobTitle: string | null
  level: number
  userCode: string | null
  avatarPath: string
  avatarFullPath: string
  branch: number
  branchColor: string | null
  branchDisplayName: string | null
  branchId: number | null
  id: number
  memberType?: EMemberType
  userId?: number
  roleName?: string | null
}
export interface IProjectForm {
  name: string
  code: string
  status: EStatusProjectForm
  timeStart: string | null
  timeEnd: string | null
  note: string | null
  projectType: EProjectType
  customerId: number | null
  tasks: Array<{
    taskId?: number
    billable?: boolean
  }>
  users: Array<{
    userId?: number
    type?: number | null
  }>
  projectTargetUsers: Array<{
    userId?: number
    roleName?: string | null
    id?: number
  }>
  isAllUserBelongTo: boolean
  komuChannelId?: string
  isNotifyToKomu?: boolean
  id?: number
}
export interface ISelectedUser {
  userId: number
  type: number
  id: number
}
export interface IGetTimeSheetProject {
  id?: string
  start: string
  end: string
}
export interface ITimeSheetStatisticTask {
  taskId?: number
  taskName: string
  totalWorkingTime: number
  billableWorkingTime: number
  billable?: boolean
}

export interface ITimeSheetStatisticTeam {
  userID?: number
  userName: string
  projectUserType?: number
  totalWorkingTime: number
  billableWorkingTime: number
}
