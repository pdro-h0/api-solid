import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest";
import { createAndAuthenticate } from "../../../utils/test/create-and-authenticate-user";
import { db } from "../../../../lib/prisma";
import prisma from "../../../../prisma/vitest-environment-prisma"

describe("CHECK-IN HISTORY (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it.only("should be able to get check-in history", async () => {
    const { token } = await createAndAuthenticate(app, true);

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
      .get(`/check-ins/history`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gymId: gym.id,
        userId: user.id,
      }),
      expect.objectContaining({
        gymId: gym.id,
        userId: user.id,
      }),
    ]);
  });
});
