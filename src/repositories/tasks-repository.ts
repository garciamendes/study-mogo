// Project
import { ITask } from '../models/task/types'

export interface ITasksRepository {
  create: (data: ITask) => Promise<ITask>
  query: () => Promise<Array<ITask>>
}