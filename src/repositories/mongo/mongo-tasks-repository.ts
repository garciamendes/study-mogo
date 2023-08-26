// Project
import { Tasks } from '../../models/task'
import { ITask } from '../../models/task/types'
import { ITasksRepository } from '../tasks-repository'

export class MongoTasksRepository implements ITasksRepository {
  async create(data: ITask) {
    const task = await Tasks.create(data)

    return task
  }

  async update(userid: string, taskid: string, data: Partial<ITask>) {
    const task = await Tasks.findOneAndUpdate({
      $where: `this.userid === ${userid} and this.taskid === ${taskid}`,
    }, data, {
      new: true
    })

    if (task)
      return task

    return null
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

  async findTaskById(taskId: string) {
    const task = await Tasks.findOne({ taskId })

    if (task)
      return task

    return null
  }
}