// Project
import { CreateTaskUseCase } from '../create-task'
import { MongoTasksRepository } from '../../repositories/mongo/mongo-tasks-repository'
import { MongoUsersRepository } from '../../repositories/mongo/mongo-users-repository'

export function makeCreateTaskUseCase() {
  const usersRepository = new MongoUsersRepository()
  const tasksRepository = new MongoTasksRepository()
  const createTaskUseCase = new CreateTaskUseCase(usersRepository, tasksRepository)

  return createTaskUseCase
}