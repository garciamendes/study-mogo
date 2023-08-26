// Project
import { ITask } from '../models/task/types'
import { ITasksRepository } from '../repositories/tasks-repository'

interface ITaskResponse {
  tasks: Array<ITask>
}

interface ITaskRequest {
  userId: string
}

export class QueryTaskUseCase {
  constructor(private taskRepository: ITasksRepository) { }

  async execute({ userId }: ITaskRequest): Promise<ITaskResponse> {

    const tasks = await this.taskRepository.query(userId)
    return { tasks }
  }
}