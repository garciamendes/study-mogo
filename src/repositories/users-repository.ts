// Project
import { IUser } from '../models/user/types'

export interface IUsersRepository {
  create: (data: IUser) => Promise<IUser>
  findUserByEmail: (email: string) => Promise<IUser | null>
  findUserById: (id: string) => Promise<IUser | null>
}