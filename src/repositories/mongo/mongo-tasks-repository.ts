// Project
import { Tasks } from '../../models/task'
import { ITask } from '../../models/task/types'
import { ITasksRepository } from '../tasks-repository'

export class MongoTasksRepository implements ITasksRepository {
  async create(data: ITask) {
    const task = await Tasks.create(data)

    return task
  }

  async update(userId: string, taskid: string, data: Partial<ITask>) {
    const task = await Tasks.findOneAndUpdate({ userId, id: taskid }, data, {
      new: true
    })

    if (task)
      return task

    return null
  }

  async query(userId: string) {
    const tasks = await Tasks.find({ userId })

    return tasks
  }

  async findTaskById(taskId: string) {
    const task = await Tasks.findOne({ id: taskId })

    if (task)
      return task

    return null
  }
}