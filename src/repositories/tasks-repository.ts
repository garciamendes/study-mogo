// Project
import { ITask } from '../models/task/types'

export interface ITasksRepository {
  create: (data: ITask) => Promise<ITask>
  query: (userId: string) => Promise<Array<ITask>>
  update: (userId: string, taskId: string, data: Partial<ITask>) => Promise<ITask | null>
  findTaskById: (taskId: string) => Promise<ITask | null>
}