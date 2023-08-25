// Node
import { randomUUID } from 'node:crypto'

// Third party
import dayjs from 'dayjs'

// Project
import { ITask } from '../../models/task/types'
import { ITasksRepository } from '../tasks-repository'
import { DATETIME_FORMAT } from '../../models/task/constants'

export class InMemoryTasksRepository implements ITasksRepository {
  public items: ITask[] = []

  async create(data: ITask) {
    const task: ITask = {
      _id: randomUUID(),
      title: data.title,
      description: data.description || '',
      isFinished: data.isFinished || false,
      created: dayjs().format(DATETIME_FORMAT),
      modified: data.modified || dayjs().format(DATETIME_FORMAT),
    }

    this.items.push(task)
    return task
  }

  async query() {
    const tasks = this.items

    return tasks
  }
}