import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCheckInService } from "../../../services/factories/make-check-in-service";

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const { latitude, longitude } = createCheckInBodySchema.parse(req.body);
  const { gymId } = createCheckInParamsSchema.parse(req.params);

  const createCheckInService = makeCheckInService();

  await createCheckInService.execute({
    gymId,
    userId: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
};
