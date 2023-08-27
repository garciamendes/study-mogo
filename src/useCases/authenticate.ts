// Third party
import { compare } from 'bcryptjs'
// Project
import { IUser } from '../models/user/types'
import { IUsersRepository } from '../repositories/users-repository'

// Local
import { InvalidCrendetialsError } from './errors/invalid-crendetials.error'

interface IAuthRequest {
  email: string
  password: string
}

interface IAuthResponse {
  user: IUser
}

export class AuthenticationUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IAuthRequest): Promise<IAuthResponse> {
    const user = await this.usersRepository.findUserByEmail(email)

    if (!user) {
      throw new InvalidCrendetialsError()
    }

    const doesPasswordsMatch = await compare(password, user.password)
    if (!doesPasswordsMatch) {
      throw new InvalidCrendetialsError()
    }

    return { user }
  }
}