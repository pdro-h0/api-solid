import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterService } from "../../services/register";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const registerSchemaBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerSchemaBody.parse(req.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(prismaUsersRepository);

    await registerService.execute({ name, email, password });
  } catch (error) {
    reply.status(409).send(error);
  }

  return reply.status(201).send();
};
