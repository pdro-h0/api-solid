import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchNearbyGymsService } from "../../../services/factories/make-fetch-nearby-gyms-service";

export const nearby = async (req: FastifyRequest, reply: FastifyReply) => {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });
  
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.query);

  const fetchNearbyGymsService = makeFetchNearbyGymsService();

  const { gyms } = await fetchNearbyGymsService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.send({
    gyms,
  });
};
