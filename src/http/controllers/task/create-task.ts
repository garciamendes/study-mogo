// Third part
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

// Project
import { makeCreateTaskUseCase } from '../../../useCases/factories/create-task-use-case'
import { ResourceNotFoundError } from '../../../useCases/errors/resource-not-found-error'

export const createTask = async (request: FastifyRequest, reply: FastifyReply) => {
  const createTaskBody = z.object({
    title: z.string(),
    description: z.string().optional(),
    isFinished: z.boolean().optional()
  })

  const { title, description, isFinished } = createTaskBody.parse(request.body)

  try {
    const createTaskUseCase = makeCreateTaskUseCase()

    const { task } = await createTaskUseCase.execute({
      title,
      description,
      isFinished,
      userId: request.user.sub
    })

    return reply.status(201).send({ task })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}