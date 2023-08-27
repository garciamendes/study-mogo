// Third part
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeQueryTaskUseCase } from '../../../useCases/factories/query-task-use-case'

// Project

export const queryTask = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const queryTaskUseCase = makeQueryTaskUseCase()

    const { tasks } = await queryTaskUseCase.execute({
      userId: request.user.sub
    })

    return reply.status(200).send({ tasks })
  } catch (error) {
    throw error
  }
}