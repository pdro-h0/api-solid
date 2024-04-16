import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "../../services/errors/invalid-credentials-error";
import { makeAuthenticateService } from "../../services/factories/make-authenticate-service";

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
    const authenticateService = makeAuthenticateService();

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
