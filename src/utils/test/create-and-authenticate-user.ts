import { FastifyInstance } from "fastify";
import request from "supertest";

export const createAndAuthenticate = async (app: FastifyInstance) => {
  await request(app.server).post("/users").send({
    name: "test-01",
    email: "test01@email.com",
    password: "123456",
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "test01@email.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return {
    token,
  }
};
