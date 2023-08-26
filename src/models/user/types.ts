// Node
import { randomUUID } from 'node:crypto'

export interface IUser {
  id?: ReturnType<typeof randomUUID>
  email: string,
  password: string
  name?: {
    first?: string,
    last?: string
  }
  created?: string
  modified?: string
}