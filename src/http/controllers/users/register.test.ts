import "dotenv/config";

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest";

describe("REGISTER (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "test-01",
      email: "test01@email.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
