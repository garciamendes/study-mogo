// Third party
import dayjs from 'dayjs'

// Project
import { mongoose } from '../../lib/mongo'

// Local
import { ITask } from './types'
import { DATETIME_FORMAT } from './constants'

const taskSchema = new mongoose.Schema<ITask>({
  title: String,
  description: { type: String, required: false, default: '' },
  isFinished: { type: Boolean, default: false, required: false },
  created: { type: String, default: dayjs().format(DATETIME_FORMAT) },
  modified: { type: String, default: dayjs().format(DATETIME_FORMAT) }
})

export const Task = mongoose.model('task', taskSchema)