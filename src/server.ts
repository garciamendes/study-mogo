import Fastify from 'fastify'
import mongoose from 'mongoose'

const fastify = Fastify(({ logger: true }))

main().catch(err => console.log(err))

const main = async () => {
  await mongoose.connect(process.env.DATABASE_URL as string)
}

fastify.listen({ port: 3001 })
  .then(() => console.log('Server Running...'))
  .catch(err => console.log(err))