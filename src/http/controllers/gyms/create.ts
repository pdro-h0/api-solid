import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateGymService } from "../../../services/factories/make-create-gym-service";

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { description, latitude, longitude, phone, title } =
    createGymBodySchema.parse(req.body);

  const createGymService = makeCreateGymService();

  await createGymService.execute({
    description,
    latitude,
    Longitude: longitude,
    phone,
    title,
  });

  return reply.status(201).send();
};
