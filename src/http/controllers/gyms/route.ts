import { FastifyInstance } from "fastify";
import { verifyJt } from "../../middlewares/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";
import { verifyUserRole } from "../../middlewares/verify-user-role";

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJt);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create);
};
