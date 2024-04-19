import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { GetUserService } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryRepository: InMemoryUsersRepository;
let getUserService: GetUserService;

describe("GET USER PROFILE SERVICE", () => {
  beforeEach(async () => {
    inMemoryRepository = new InMemoryUsersRepository();
    getUserService = new GetUserService(inMemoryRepository);
  });

  it("should be able to get profile", async () => {
    const createdUser = await inMemoryRepository.create({
      name: "user - 1",
      email: "user1@email.com",
      passwordHash: await hash("123456", 6),
    });

    const { user } = await getUserService.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("user - 1");
  });

  it("should not be able to get user profile with wrong id", async () => {
    const userCreated = await inMemoryRepository.create({
      name: "user - 1",
      email: "user1@email.com",
      passwordHash: await hash("123456", 6),
    });

    await expect(() =>
      getUserService.execute({
        userId: "wrong - id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
