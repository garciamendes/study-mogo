// Project
import { beforeEach, describe, expect, it } from 'vitest'

// Project
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository'

// Local
import { QueryTaskUseCase } from './query-task'

let tasksRepository: InMemoryTasksRepository
let sut: QueryTaskUseCase

describe('Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new QueryTaskUseCase(tasksRepository)
  })

  it('Test should be able to list the tasks', async () => {
    for (let index = 1; index <= 10; index++) {
      await tasksRepository.create({
        title: `task ${index.toString().padStart(2, '0')}`
      })
    }

    const { tasks } = await sut.execute()
    expect(tasks).toHaveLength(10)
  })
})