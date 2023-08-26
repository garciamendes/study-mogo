export interface IUser {
  email: string,
  password: string
  name: {
    first?: string,
    last?: string
  }
  created?: string
  modified?: string
}