import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../app";
import request from "supertest";

describe("PROFILE (e2e)", () => {
  beforeAll(async () => {
    app.ready();
  });
  afterAll(async () => {
    app.close();
  });

  it("should be able to get user profile", async () => {
    await request(app.server).post("/users").send({
      name: "test-01",
      email: "test01@email.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "test01@email.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "test01@email.com",
      })
    );
  });
});
