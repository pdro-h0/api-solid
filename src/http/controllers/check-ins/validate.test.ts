import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest";
import { createAndAuthenticate } from "../../../utils/test/create-and-authenticate-user";
import { db } from "../../../../lib/prisma";

describe("VALIDATE CHECK-IN (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it.only("should be able to validate check-in", async () => {
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

    let checkIn = await db.checkIn.create({
      data: {
        gymId: gym.id,
        userId: user.id,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);

    checkIn = await db.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    expect(checkIn.validatedAt).toEqual(expect.any(Date));
  });
});
