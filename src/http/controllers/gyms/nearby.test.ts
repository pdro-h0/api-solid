import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticate } from "../../../utils/test/create-and-authenticate-user";
import request from "supertest";

describe("NEARBY GYMS", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to list neaby gyms", async () => {
    const { token } = await createAndAuthenticate(app, true);

     await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Near Gym",
        description: "",
        phone: "",
        latitude: -21.417827,
        longitude: -45.955703,
      });
     await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Far Gym",
        description: "",
        phone: "",
        latitude: -26.417827,
        longitude: -50.955703,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -21.417827,
        longitude: -45.955703,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: "Near Gym" }),
    ]);
  });
});
