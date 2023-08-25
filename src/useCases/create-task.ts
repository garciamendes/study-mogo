// Project
import { ITask } from '../models/task/types'
import { ITasksRepository } from '../repositories/tasks-repository'

interface ITaskResponse {
  task: ITask
}

export class CreateTaskUseCase {
  constructor(private taskRepository: ITasksRepository) {}

  async execute(data: ITask): Promise<ITaskResponse> {
    const task = await this.taskRepository.create({
      title: data.title,
      description: data.description,
      modified: data.modified,
      isFinished: data.isFinished
    })

    return { task }
  }
}