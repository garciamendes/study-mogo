// Third party
import { FastifyInstance } from 'fastify'

// Local
import { authenticate } from './authenticate'
import { createUser } from './create-user'

export async function usersRoutes(app: FastifyInstance) {
  // Public routes
  app.post('/', createUser)
  app.post('/user-auth', authenticate)
}