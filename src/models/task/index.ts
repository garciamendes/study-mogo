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
    default: randomUUID,
    index: true
  },
  title: String,
  description: { type: String, required: false, default: '' },
  isFinished: { type: Boolean, default: false, required: false },
  userId: {
    type: String,
    required: [true, 'user id is required!'],
    index: true
  },
  created: { type: String, default: dayjs().format(DATETIME_FORMAT) },
  modified: { type: String, default: dayjs().format(DATETIME_FORMAT) }
})

export const Tasks = mongoose.model('tasks', taskSchema)