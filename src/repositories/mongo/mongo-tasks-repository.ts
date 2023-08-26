// Project
import { Tasks } from '../../models/task'
import { ITask } from '../../models/task/types'
import { ITasksRepository } from '../tasks-repository'

export class MongoTasksRepository implements ITasksRepository {
  async create(data: ITask) {
    const task = await Tasks.create(data)

    return task
  }

  async query(userId: string) {
    const tasks = await Tasks.find({ userId }, (err: Error, result: Array<ITask>) => {
      if (err) {
        console.log(err)
        return []
      }

      return result
    })

    return tasks
  }
}