import { FastifyInstance } from "fastify";
import { verifyJt } from "../../middlewares/verify-jwt";

export const gymsRoutes = async (app: FastifyInstance) => {
    app.addHook("onRequest", verifyJt)
};
