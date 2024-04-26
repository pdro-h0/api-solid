import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest";
import { createAndAuthenticate } from "../../../utils/test/create-and-authenticate-user";
import { db } from "../../../../lib/prisma";

describe("CHECK-IN METRICS (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it.only("should be able to get total of check-in", async () => {
    const { token } = await createAndAuthenticate(app);

    const user = await db.user.findFirstOrThrow();

    const gym = await db.gym.create({
      data: {
        title: "gym-1",
        description: null,
        phone: null,
        latitude: -21.417827,
        Longitude: -45.955703,
      },
    });

    await db.checkIn.createMany({
      data: [
        {
          gymId: gym.id,
          userId: user.id,
        },
        {
          gymId: gym.id,
          userId: user.id,
        },
      ],
    });

    const response = await request(app.server)
      .get(`/check-ins/metrics`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.body.checkInsCount).toEqual(2);
    expect(response.statusCode).toEqual(200)
  });
});
