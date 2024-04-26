import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import request from "supertest";
import { createAndAuthenticate } from "../../../utils/test/create-and-authenticate-user";

describe("SEARCH (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to search gyms", async () => {
    const { token } = await createAndAuthenticate(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "gym-1",
        description: null,
        phone: null,
        latitude: -21.417827,
        longitude: -45.955703,
      });
    const gym = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "gym-2",
        description: null,
        phone: null,
        latitude: -27.417827,
        longitude: -50.955703,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "gym-2",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: "gym-2" }),
    ]);
  });
});
