import dotenv from 'dotenv-safe'
dotenv.config()

import Fastify from 'fastify'
import { mongoose } from './lib/mongo'

const fastify = Fastify(({ logger: true }))

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => {
    console.log('db connected successfully')

    fastify.listen({ port: 3001 })
      .then(() => console.log('Server Running...'))
      .catch(err => console.log(err))
  })
  .catch((err) => console.log(err))