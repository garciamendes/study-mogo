// Third party
import { describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

// Project
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'

// Local
import { AuthenticationUseCase } from './authenticate'
import { InvalidCrendetialsError } from './errors/invalid-crendetials.error'

describe('Authenticate Use Case', () => {
  it('Validating if the user can authenticate', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticationUseCase(userRepository)

    await userRepository.create({
      email: 'garcia1@gmail.com',
      password: await hash('dev123', 6),
    })

    const { user } = await sut.execute({
      email: 'garcia1@gmail.com',
      password: 'dev123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Validating if the user can authenticate with a non-existent email', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticationUseCase(userRepository)

    expect(() =>
      sut.execute({
        email: 'garcia1@gmail.com',
        password: 'dev123',
      }),
    ).rejects.toBeInstanceOf(InvalidCrendetialsError)
  })

  it('Validating if the user can authenticate with the wrong password', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticationUseCase(userRepository)

    await userRepository.create({
      email: 'garcia1@gmail.com',
      password: await hash('dev12345', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'garcia1@gmail.com',
        password: 'dev123',
      }),
    ).rejects.toBeInstanceOf(InvalidCrendetialsError)
  })
})