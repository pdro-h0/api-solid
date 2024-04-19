import { it, expect, describe, beforeEach } from "vitest";
import { RegisterService } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExists } from "./errors/user-already-exists-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerService: RegisterService;

describe("REGISTER SERVICE", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    registerService = new RegisterService(inMemoryUsersRepository);
  });
  it("should be able to register", async () => {
    const { user } = await registerService.execute({
      name: "user 1",
      email: "test@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should hash user password upon registration", async () => {
    const { user } = await registerService.execute({
      name: "user 1",
      email: "test@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.passwordHash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register the same email twice", async () => {
    const email = "test@example.com";

    await registerService.execute({
      name: "user 1",
      email,
      password: "123456",
    });

    await expect(() =>
      registerService.execute({
        name: "user 1",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExists);
  });
});
