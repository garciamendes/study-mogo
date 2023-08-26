// Node
import { randomUUID } from 'node:crypto'

// Third party
import dayjs from 'dayjs'

// Project
import { ITask } from '../../models/task/types'
import { ITasksRepository } from '../tasks-repository'
import { DATETIME_FORMAT } from '../../models/utils'

export class InMemoryTasksRepository implements ITasksRepository {
  public items: ITask[] = []

  async create(data: ITask) {
    const task: ITask = {
      id: randomUUID(),
      userId: data.userId,
      title: data.title,
      description: data.description || '',
      isFinished: data.isFinished || false,
      created: dayjs().format(DATETIME_FORMAT),
      modified: data.modified || dayjs().format(DATETIME_FORMAT),
    }

    this.items.push(task)
    return task
  }

  async update(userId: string, taskId: string, data: Partial<ITask>) {
    const taskIndex = this.items.findIndex(row => row.userId === userId && row.id === taskId)

    if (taskIndex === -1) return null
    let task = this.items[taskIndex]

    const updatedTask: Partial<ITask> = {
      description: data.description,
      isFinished: data.isFinished,
      title: data.title,
      modified: dayjs().format(DATETIME_FORMAT),

      // not update
      id: task.id,
      userId: task.userId,
      created: task.created,
    }

    task = updatedTask as ITask
    return task
  }

  async query(userId: string) {
    const tasks = this.items.filter(row => row.userId === userId)

    return tasks
  }

  async findTaskById(taskId: string) {
    const task = this.items.find(row => row.id === taskId)

    if (task)
      return task

    return null
  }
}