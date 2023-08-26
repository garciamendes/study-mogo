// Project
import { beforeEach, describe, expect, it } from 'vitest'

// Project
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository'

// Local
import { QueryTaskUseCase } from './query-task'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let tasksRepository: InMemoryTasksRepository
let sut: QueryTaskUseCase

describe('Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new QueryTaskUseCase(tasksRepository)
  })

  it('Test should be able to list the tasks', async () => {
    const userRepository = new InMemoryUsersRepository()
    const user_01 = await userRepository.create({
      email: 'test@example.com',
      password: 'dev123'
    })
    const user_02 = await userRepository.create({
      email: 'test2@example.com',
      password: 'dev123'
    })

    for (let index = 1; index <= 5; index++) {
      await tasksRepository.create({
        title: `task ${index.toString().padStart(2, '0')}`,
        userId: user_01.id as string
      })
    }

    for (let index = 1; index <= 5; index++) {
      await tasksRepository.create({
        title: `task ${index.toString().padStart(2, '0')}`,
        userId: user_02.id as string
      })
    }

    const { tasks } = await sut.execute({ userId: user_01.id as string })
    expect(tasks).toHaveLength(5)
  })

  it('Test should not list tasks without a user ID', async () => {

    const { tasks } = await sut.execute({ userId: 'user_id_teste' })
    expect(tasks).toHaveLength(0)
  })
})