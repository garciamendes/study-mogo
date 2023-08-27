// Third part
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

// Project
import { makeCreateUserUseCase } from '../../../useCases/factories/create-user-use-case'
import { UserAlreadyExistsError } from '../../../useCases/errors/user-already-exists-error'

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const createUserBody = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.object({
      first: z.string().optional(),
      last: z.string().optional()
    }).optional()
  })

  const { email, name, password } = createUserBody.parse(request.body)

  try {
    const createUserUseCase = makeCreateUserUseCase()

    await createUserUseCase.execute({
      email,
      name,
      password,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}