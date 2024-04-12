import fastify from "fastify";
import { z } from "zod";
import { db } from "../lib/prisma";

export const app = fastify();

app.post("/users", async (req, reply) => {
  const registerSchemaBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerSchemaBody.parse(req.body);

  await db.user.create({
    data: {
      name,
      email,
      passwordHash: password
    },
  });

  reply.status(201).send();
});
