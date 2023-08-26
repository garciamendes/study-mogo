// Project
import { randomUUID } from 'node:crypto'

export interface ITask {
  id?: ReturnType<typeof randomUUID>
  title: string
  description?: string
  isFinished?: boolean
  userId: string
  created?: string
  modified?: string
}