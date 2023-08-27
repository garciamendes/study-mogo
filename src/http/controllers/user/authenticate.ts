// Third party
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'
import { makeAuthenticateUseCase } from '../../../useCases/factories/make-authenticate-use-case'
import { IUser } from '../../../models/user/types'
import { InvalidCrendetialsError } from '../../../useCases/errors/invalid-crendetials.error'

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  const authenticateBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
  })

  const { email, password } = authenticateBody.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign({}, {
      sign: { sub: user.id }
    })

    const userResponse: Omit<IUser, 'password'> = {
      email: user.email,
      created: user.created,
      id: user.id,
      modified: user.modified,
      name: user.name
    }

    return reply.status(200).send({ token: token, user: userResponse })
  } catch (error) {
    if (error instanceof InvalidCrendetialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}