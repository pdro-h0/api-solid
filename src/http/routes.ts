import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
// import { getUsersController } from "./controllers/get-users-controller";

export const appRoutes = async (app: FastifyInstance) =>{
app.post("/users", register);
app.post("/sessions", authenticate)
// app.get("/users", getUsersController)

}