// Project
import { QueryTaskUseCase } from '../query-task'
import { MongoTasksRepository } from '../../repositories/mongo/mongo-tasks-repository'

export function makeQueryTaskUseCase() {
  const tasksRepository = new MongoTasksRepository()
  const queryTasksUseCase = new QueryTaskUseCase(tasksRepository)

  return queryTasksUseCase
}