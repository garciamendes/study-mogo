// Project
import { Task } from '../../models/task'
import { ITask } from '../../models/task/types'
import { ITasksRepository } from '../tasks-repository'

export class MongoTasksRepository implements ITasksRepository {
  async create(data: ITask) {
    const task = await Task.create(data)

    return task
  }

  async query() {
    const tasks = await Task.find({}, (err: Error, result: Array<ITask>) => {
      if (err) {
        console.log(err)
        return []
      }

      return result
    })

    return tasks
  }
}