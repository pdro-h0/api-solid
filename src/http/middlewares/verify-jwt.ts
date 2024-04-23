import { FastifyRequest, FastifyReply } from "fastify";

export const verifyJt = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    await req.jwtVerify();
  } catch (error) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
};
