// Project
import { UpdateTaskUseCase } from '../update-task'
import { MongoTasksRepository } from '../../repositories/mongo/mongo-tasks-repository'
import { MongoUsersRepository } from '../../repositories/mongo/mongo-users-repository'

export function makeCreateTaskUseCase() {
  const usersRepository = new MongoUsersRepository()
  const tasksRepository = new MongoTasksRepository()
  const updateTaskUseCase = new UpdateTaskUseCase(usersRepository, tasksRepository)

  return updateTaskUseCase
}