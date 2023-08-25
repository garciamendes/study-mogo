// Project
import { ITask } from '../models/task/types'
import { ITasksRepository } from '../repositories/tasks-repository'

interface ITaskResponse {
  tasks: Array<ITask>
}

export class QueryTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async execute(): Promise<ITaskResponse> {
    const tasks = await this.taskRepository.query()

    return { tasks }
  }
}