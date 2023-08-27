import dotenv from 'dotenv-safe'
dotenv.config()

import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { mongoose } from './lib/mongo'
import { usersRoutes } from './http/controllers/user/routes'
import { tasksRoutes } from './http/controllers/task/routes'

const fastify = Fastify(({ logger: true }))
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string
})

fastify.register(usersRoutes, {
  prefix: 'api/user',
})
fastify.register(tasksRoutes, {
  prefix: 'api/task',
})

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => {
    console.log('db connected successfully')

    fastify.listen({ port: 3001 })
      .then(() => console.log('Server Running...'))
      .catch(err => console.log(err))
  })
  .catch((err) => console.log(err))