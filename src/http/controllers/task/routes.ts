// Third party
import { FastifyInstance } from 'fastify'

// Project
import { verifyJwt } from '../../middlewares/verify-jwt'

// Local
import { queryTask } from './query-task'
import { createTask } from './create-task'
import { updateTask } from './update-task'

// Local

export async function tasksRoutes(app: FastifyInstance) {
  // Check if the user is authenticated in the application
  app.addHook('onRequest', verifyJwt)

  app.get('/', queryTask)
  app.post('/', createTask)
  app.patch('/:task_id', updateTask)
}