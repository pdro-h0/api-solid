import { FastifyInstance } from "fastify";
import request from "supertest";
import { db } from "../../../lib/prisma";
import { hash } from "bcryptjs";

export const createAndAuthenticate = async (app: FastifyInstance, isAdmin: boolean = false) => {
  // await request(app.server).post("/users").send({
  //   name: "test-01",
  //   email: "test01@email.com",
  //   password: "123456",
  //   role: isAdmin ? "ADMIN" : "MEMBER"
  // });

  await db.user.create({
    data: {
      name: "test-01",
      email: "test01@email.com",
      passwordHash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
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
