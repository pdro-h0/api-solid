import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { verifyJt } from "./middlewares/verify-jwt";
// import { getUsersController } from "./controllers/get-users-controller";

export const appRoutes = async (app: FastifyInstance) => {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  // app.get("/users", getUsersController)

  // AUTHENTICATED
  app.get("/me", { onRequest: [verifyJt] }, profile);
};
