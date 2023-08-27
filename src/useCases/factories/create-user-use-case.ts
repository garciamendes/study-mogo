// Project
import { CreateUserUseCase } from '../create-user'
import { MongoUsersRepository } from '../../repositories/mongo/mongo-users-repository'

export function makeCreateUserUseCase() {
  const usersRepository = new MongoUsersRepository()
  const createUserUseCase = new CreateUserUseCase(usersRepository)

  return createUserUseCase
}