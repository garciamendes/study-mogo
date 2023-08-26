// Project
import { beforeEach, describe, expect, it } from 'vitest'

// Project
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository'

// Local
import { CreateTaskUseCase } from './create-task'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let tasksRepository: InMemoryTasksRepository
let userRepository: InMemoryUsersRepository
let sut: CreateTaskUseCase

describe('Task Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    tasksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(userRepository, tasksRepository)
  })

  it('Testing should be able to create a new task', async () => {
    const { id: userID } = await userRepository.create({
      email: 'userTask@example.com',
      password: 'dev123'
    })

    const { task } = await sut.execute({
      userId: userID as string,
      title: 'Task create task',
    })

    expect(task.id).toEqual(expect.any(String))
    expect(task.userId).toEqual(expect.any(String))
  })

  it('Test should not create task without a user ID existed', async () => {

    await expect(() => sut.execute({
      userId: 'user_id_teste',
      title: 'Task create task',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})