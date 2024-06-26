import { FastifyInstance } from "fastify";
import { verifyJt } from "../../middlewares/verify-jwt";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";
import { verifyUserRole } from "../../middlewares/verify-user-role";

export const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJt);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);
  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validate
  );

  app.post("/gyms/:gymId/check-ins", create);
};
