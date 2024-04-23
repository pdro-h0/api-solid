import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserProfileServie } from "../../services/factories/make-get-user-profile-service";

export const profile = async (req: FastifyRequest, reply: FastifyReply) => {
  const getUserProfileRepository = makeGetUserProfileServie();

  const { user } = await getUserProfileRepository.execute({
    userId: req.user.sub,
  });

  return reply.send({
    user: {
      ...user,
      passwordHash: undefined,
    },
  });
};
