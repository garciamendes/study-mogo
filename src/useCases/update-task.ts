// Project
import { ITask } from '../models/task/types'
import { ITasksRepository } from '../repositories/tasks-repository'
import { IUsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface ITaskResponse {
  task: ITask | null
}

interface ITaskRequest {
  userId: string
  taskId: string,
  data: Partial<ITask>
}

export class UpdateTaskUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private taskRepository: ITasksRepository) { }

  async execute({ userId, taskId, data }: ITaskRequest): Promise<ITaskResponse> {
    const isUserExist = await this.userRepository.findUserById(userId)
    const isTaskExist = await this.taskRepository.findTaskById(taskId)

    if (!isUserExist || !isTaskExist)
      throw new ResourceNotFoundError()

    const task = await this.taskRepository.update(userId, taskId, data)

    return { task }
  }
}