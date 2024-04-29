import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticate } from "../../../utils/test/create-and-authenticate-user";
import request from "supertest";

describe("CREATE GYMS (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should create a gym", async () => {
    const { token } = await createAndAuthenticate(app, true);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "gym-1",
        description: "some description",
        phone: "40028922",
        latitude: -21.417827,
        longitude: -45.955703,
      });

    expect(response.statusCode).toEqual(201);
  });
});
