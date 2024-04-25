import { z } from "zod";

import { FastifyRequest, FastifyReply } from "fastify";
import { makeValidateService } from "../../../services/factories/make-validate-check-in-service";

export const validate = async (req: FastifyRequest, reply: FastifyReply) => {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(req.params);

  const alidateService = makeValidateService();

  await alidateService.execute({
    checkInId,
  });

  return reply.status(204).send();
};
