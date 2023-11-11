// Project
import { beforeEach, describe, expect, it } from 'vitest'

// Project
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'

// Local
import { CreateUserUseCase } from './create-user'

let userRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Task Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(userRepository)
  })

  it('Testing should be able to create a new user', async () => {
    const { user } = await sut.execute({
      email: 'user@example.com',
      password: 'dev123',
      name: {
        first: 'Teste first',
        last: 'Teste last'
      }
    })

    expect(user.id).toEqual(expect.any(String))
  })
})