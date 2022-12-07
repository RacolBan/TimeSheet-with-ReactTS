export interface ILogin {
  username: string
  password: string
  rememberClient: boolean
}

export interface ILoginCheck {
  loading: boolean
  error: boolean
  accessToken: string | null
}

export interface IAuthReducer {
  authReducer: ILoginCheck
}
export interface IUserInfo {
  authReducer: any
  surname: string
  name: string
  emailAddress: string
  avatarPath: string
  sex: number
}
