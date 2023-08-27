// Third party
import { hash } from 'bcryptjs'

// Project
import { IUser } from '../models/user/types'
import { IUsersRepository } from '../repositories/users-repository'

// Local
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface IUserResponse {
  user: IUser
}

export class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IUser): Promise<IUserResponse> {
    const isUserExist = await this.userRepository.findUserByEmail(data.email)

    if (isUserExist)
      throw new UserAlreadyExistsError()

    const password_hash = await hash(data.password, 6)
    const user = await this.userRepository.create({
      email: data.email,
      password: password_hash,
      name: data.name
    })

    return { user }
  }
}