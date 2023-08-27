// Node
import { randomUUID } from 'node:crypto'

// Third party
import dayjs from 'dayjs'

// Project
import { DATETIME_FORMAT } from '../../models/utils'
import { IUsersRepository } from '../users-repository'
import { IUser } from '../../models/user/types'

export class InMemoryUsersRepository implements IUsersRepository {
  public items: IUser[] = []

  async create(data: IUser) {
    const user: IUser = {
      id: randomUUID(),
      email: data.email,
      password: data.password,
      created: dayjs().format(DATETIME_FORMAT),
      modified: data.modified || dayjs().format(DATETIME_FORMAT),
    }

    this.items.push(user)
    return user
  }

  async findUserByEmail(email: string) {
    const user = this.items.find(row => row.email === email)

    if (user)
      return user

    return null
  }

  async findUserById(id: string) {
    const user = this.items.find(row => row.id === id)

    if (user)
      return user

    return null
  }
}