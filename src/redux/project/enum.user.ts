export enum EBranchUser{
  HaNoi,
  DaNang,
  HoChiMinh,
  All
}
export enum ETypeUser {
  Staff,
  InternShip,
  Collaborator,
  All,
}
export enum EMemberType {
  Member,
  ProjectManager,
  Shadow,
  DeActive
}
export enum EFilterTime {
  Week = 'Week',
  Month = 'Month',
  Quarter = 'Quarter',
  Year = 'Year',
  All = 'All Time',
  Custom = 'Custom Time'
}
export interface ITask {
  name: string
  type: number
  isDeleted: boolean
  id: number
  isBillable: boolean
  taskId: number
}

export enum ETaskType {
  CommonTask = 'Common Task',
  OtherTask = 'Other Task'
}

export interface ISelectedTask {
  taskId: number
  billable: boolean
  id: number
}
export enum ELevelUser {
  Intern0,
  Intern1,
  Intern2,
  Prefresher,
  Fresher0,
  Fresher1,
  Fresher2,
  Junior0,
  Junior1,
  Junior2,
  Middle0,
  Middle1,
  Middle2,
  Senior0,
  Senior1,
  Senior2,
  All,
}
export enum EProjectType {
  TM,
  FF,
  NB,
  ODC,
  P,
  T
}

export enum EStatusProject {
  All = 'All',
  Active = 'Active',
  InActive = 'InActive'
}

export enum EStatusProjectForm {
  Active,
  DeActive
}
