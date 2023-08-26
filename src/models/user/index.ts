// Third party
import dayjs from 'dayjs'

// Project
import { mongoose } from '../../lib/mongo'

// Local
import { IUser } from './types'
import { DATETIME_FORMAT } from '../utils'

const taskSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  created: { type: String, default: dayjs().format(DATETIME_FORMAT) },
  modified: { type: String, default: dayjs().format(DATETIME_FORMAT) }
})

export const Task = mongoose.model('task', taskSchema)