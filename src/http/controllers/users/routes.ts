import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJt } from "../../middlewares/verify-jwt";
// import { getUsersController } from "./controllers/get-users-controller";

export const usersRoutes = async (app: FastifyInstance) => {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  // app.get("/users", getUsersController)

  // AUTHENTICATED
  app.get("/me", { onRequest: [verifyJt] }, profile);
};
