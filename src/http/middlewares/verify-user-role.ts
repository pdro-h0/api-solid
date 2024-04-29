import { FastifyRequest, FastifyReply } from "fastify";

export const verifyUserRole = (roleToVerify: "MEMBER" | "ADMIN") => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const { role } = req.user;

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: "Unauthorized!" });
    }
  };
};
