// Project
import { AuthenticationUseCase } from '../authenticate'
import { MongoUsersRepository } from '../../repositories/mongo/mongo-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new MongoUsersRepository()
  const authenticateUseCase = new AuthenticationUseCase(usersRepository)

  return authenticateUseCase
}