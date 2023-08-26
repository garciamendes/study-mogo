// Project
import { Users } from '../../models/user'
import { IUser } from '../../models/user/types'
import { IUsersRepository } from '../users-repository'

export class MongoUsersRepository implements IUsersRepository {
  async create(data: IUser) {
    const user = await Users.create(data)

    return user
  }

  async findUserByEmail(email: string) {
    const user = await Users.findOne({ email })

    if (user)
      return user

    return null
  }

  async findUserById(id: string) {
    const user = await Users.findOne({ id })

    if (user)
      return user

    return null
  }
}