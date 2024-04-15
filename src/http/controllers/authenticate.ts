import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../../services/authenticate";
import { InvalidCredentialsError } from "../../services/errors/invalid-credentials-error";

export const authenticate = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateService = new AuthenticateService(prismaUsersRepository);

    await authenticateService.execute({
      email,
      password,
    });

    return reply.send();
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send(error.message);
    }

    throw error;
  }
};
