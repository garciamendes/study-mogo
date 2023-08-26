// Node
import { randomUUID } from 'node:crypto'

// Third party
import dayjs from 'dayjs'

// Project
import { mongoose } from '../../lib/mongo'
import { DATETIME_FORMAT } from '../utils'

// Local
import { ITask } from './types'

const taskSchema = new mongoose.Schema<ITask>({
  id: {
    type: String,
    default: randomUUID
  },
  title: String,
  description: { type: String, required: false, default: '' },
  isFinished: { type: Boolean, default: false, required: false },
  created: { type: String, default: dayjs().format(DATETIME_FORMAT) },
  modified: { type: String, default: dayjs().format(DATETIME_FORMAT) }
})

export const Task = mongoose.model('task', taskSchema)