export interface ITask {
  id?: string | number
  title: string
  description?: string
  isFinished?: boolean
  userId: string
  created?: string
  modified?: string
}

export interface ITasksResponse {
  tasks: ITask[]
}

export interface ITaskCreateResquest {
  title: string
  description?: string
  isFinished?: boolean
}

export interface ITaskCreateResponse extends ITask {
}