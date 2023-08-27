// Node
import { randomUUID } from 'node:crypto'

// Third party
import dayjs from 'dayjs'

// Project
import { mongoose } from '../../lib/mongo'

// Local
import { IUser } from './types'
import { DATETIME_FORMAT, REGEX_MAIL } from '../utils'

const userSchema = new mongoose.Schema<IUser>({
  id: {
    type: String,
    default: randomUUID,
    index: true
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function(value: string) {
        const validatedRegex = new RegExp(REGEX_MAIL).test(value)
        return validatedRegex
      },
      message: props => `${props.value} is not a valid email!`
    },
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  created: { type: String, default: dayjs().format(DATETIME_FORMAT) },
  modified: { type: String, default: dayjs().format(DATETIME_FORMAT) }
})

export const Users = mongoose.model('users', userSchema)