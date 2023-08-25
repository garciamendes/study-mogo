// Project
import { beforeEach, describe, expect, it } from 'vitest'

// Project
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository'

// Local
import { CreateTaskUseCase } from './create-task'

let tasksRepository: InMemoryTasksRepository
let sut: CreateTaskUseCase

describe('Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(tasksRepository)
  })

  it('Testing should be able to create a new task', async () => {
    const { task } = await sut.execute({
      title: 'Task create task',
    })

    expect(task._id).toEqual(expect.any(String))
  })
})