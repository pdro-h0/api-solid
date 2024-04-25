import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInHistoryService } from "../../../services/factories/make-fetch-user-check-in-history";

export const history = async (req: FastifyRequest, reply: FastifyReply) => {
  const checkInHistoryQuerySchema = z.object({
    page: z.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(req.query);

  const fetchUserCheckInHistoryService = makeFetchUserCheckInHistoryService();

  const { checkIns } = await fetchUserCheckInHistoryService.execute({
    page,
    userId: req.user.sub,
  });

  return reply.send({
    checkIns,
  });
};
