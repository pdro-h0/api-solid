import { makeGetUserMetricsService } from "../../../services/factories/make-get-user-metrics-service";
import { FastifyRequest, FastifyReply } from "fastify";

export const metrics = async (req: FastifyRequest, reply: FastifyReply) => {
  const getUserMetricsService = makeGetUserMetricsService();

  const { checkInsCount } = await getUserMetricsService.execute({
    userId: req.user.sub,
  });

  return reply.send({
    checkInsCount,
  });
};
