// Third part
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

// Project
import { makeCreateTaskUseCase } from '../../../useCases/factories/create-task-use-case'
import { ResourceNotFoundError } from '../../../useCases/errors/resource-not-found-error'
import { makeUpdateTaskUseCase } from '../../../useCases/factories/update-task-use-case'

export const updateTask = async (request: FastifyRequest, reply: FastifyReply) => {
  const createTaskBody = z.object({
    title: z.string(),
    description: z.string().optional(),
    isFinished: z.boolean().optional()
  })
  const taskIdParams = z.object({
    task_id: z.string().uuid(),
  })

  const { title, description, isFinished } = createTaskBody.parse(request.body)
  const { task_id } = taskIdParams.parse(request.params)

  try {
    const updateTaskUseCase = makeUpdateTaskUseCase()

    const { task } = await updateTaskUseCase.execute({
      taskId: task_id,
      userId: request.user.sub,
      data: {
        title,
        description,
        isFinished,
      }
    })

    return reply.status(200).send({ task })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}