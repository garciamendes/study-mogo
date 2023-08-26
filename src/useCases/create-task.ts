// Project
import { ITask } from '../models/task/types'
import { ITasksRepository } from '../repositories/tasks-repository'
import { IUsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ITaskResponse {
  task: ITask
}

export class CreateTaskUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private taskRepository: ITasksRepository) { }

  async execute(data: ITask): Promise<ITaskResponse> {
    const isUserExist = await this.userRepository.findUserById(data.userId)

    if (!isUserExist)
      throw new ResourceNotFoundError()

    const task = await this.taskRepository.create({
      title: data.title,
      description: data.description,
      userId: data.userId
    })

    return { task }
  }
}