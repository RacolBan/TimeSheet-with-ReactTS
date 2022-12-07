export interface ICustomer {
  name: string
  id: number
}
export interface ICustomerState {
  customerList: ICustomer[]
}
export interface ICustomerRef {
  customerReducer: ICustomerState
}
export interface ICustomerPost {
  name: string
  code: string
  address: string
}
