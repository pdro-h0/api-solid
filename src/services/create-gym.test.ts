import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { CreateGymService } from "./create-gym";

let inMemoryGymsRepository: InMemoryGymsRepository;
let createGymService: CreateGymService;

describe("CREATE GYM SERVICE", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    createGymService = new CreateGymService(inMemoryGymsRepository);
  });

  it("should create a gym", async () => {
    const gym = await createGymService.execute({
      title: "gym-1",
      description: null,
      phone: null,
      latitude: -21.417827,
      Longitude: -45.955703,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
