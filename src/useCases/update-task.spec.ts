// Project
import { beforeEach, describe, expect, it } from 'vitest'

// Project
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository'

// Local
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UpdateTaskUseCase } from './update-task'
import { ITask } from '../models/task/types'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let tasksRepository: InMemoryTasksRepository
let sut: UpdateTaskUseCase

describe('Task Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    tasksRepository = new InMemoryTasksRepository()
    sut = new UpdateTaskUseCase(usersRepository, tasksRepository)
  })

  it('Testing should be able to update an existing task', async () => {
    const { id: userID } = await usersRepository.create({
      email: 'userTask@example.com',
      password: 'dev123'
    })

    const task_created = await tasksRepository.create({
      title: 'Task create test',
      userId: userID as string
    })

    const data_to_update: Partial<ITask> = {
      title: 'Task update test',
      description: 'description update test',
      isFinished: true
    }

    const { task } = await sut.execute({
      userId: userID as string,
      taskId: task_created.id as string,
      data: data_to_update
    })

    expect(task).not.toBeNull()
    expect(task?.description).toEqual(data_to_update.description)
    expect(task?.title).toEqual(data_to_update.title)
    expect(task?.isFinished).toEqual(data_to_update.isFinished)
  })

  it('Test should not be possible to update a task without user ID and task ID', async () => {

    await expect(() => sut.execute({
      userId: 'user_id_teste',
      taskId: 'Task create task',
      data: {}
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})