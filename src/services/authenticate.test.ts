import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateService } from "./authenticate";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateService: AuthenticateService;

describe("AUTHENTICATE SERVICE", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateService = new AuthenticateService(inMemoryUsersRepository);
  });
  it("should be able to authenticate", async () => {
    await inMemoryUsersRepository.create({
      name: "user - 1",
      email: "user1@test.com",
      passwordHash: await hash("123456", 6),
    });

    const { user } = await authenticateService.execute({
      email: "user1@test.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await inMemoryUsersRepository.create({
      name: "user - 1",
      email: "user1@test.com",
      passwordHash: await hash("123456", 6),
    });

    await expect(() =>
      authenticateService.execute({
        email: "blabla@test.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await inMemoryUsersRepository.create({
      name: "user - 1",
      email: "user1@test.com",
      passwordHash: await hash("123456", 6),
    });

    await expect(() =>
      authenticateService.execute({
        email: "user1@test.com",
        password: "wrong",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
