// Project
import { ITask } from '../models/task/types'

export interface ITasksRepository {
  create: (data: ITask) => Promise<ITask>
  query: (userId: string) => Promise<Array<ITask>>
}