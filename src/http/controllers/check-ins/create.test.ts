import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest";
import { createAndAuthenticate } from "../../../utils/test/create-and-authenticate-user";
import { db } from "../../../../lib/prisma";

describe("CREATE CHECK-IN (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it.only("should be able to create check-in", async () => {
    const { token } = await createAndAuthenticate(app);

    const gym = await db.gym.create({
      data: {
        title: "gym-1",
        description: null,
        phone: null,
        latitude: -21.417827,
        Longitude: -45.955703,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -21.417827,
        longitude: -45.955703,
      });
    expect(response.statusCode).toEqual(201);
  });
});
