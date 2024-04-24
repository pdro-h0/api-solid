import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { UserAlreadyExists } from "../../../services/errors/user-already-exists-error";
import { makeRegisterService } from "../../../services/factories/make-register-service";

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const registerSchemaBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerSchemaBody.parse(req.body);

  try {
    const registerService = makeRegisterService();

    await registerService.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      reply.status(409).send(error.message);
    }

    return reply.status(500).send();
  }

  return reply.status(201).send();
};
