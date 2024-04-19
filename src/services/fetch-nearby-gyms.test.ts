import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsService } from "./fetch-nearby-gyms";

let inMemoryGymsRepository: InMemoryGymsRepository;
let fetchNearbyGymsService: FetchNearbyGymsService;

describe("FETCH NEARBY GYMS", () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    fetchNearbyGymsService = new FetchNearbyGymsService(inMemoryGymsRepository);
  });

  it("should be able to fetch neaby gyms", async () => {
    await inMemoryGymsRepository.create({
      id: "gym-1",
      title: "Near Gym",
      description: "",
      phone: "",
      latitude: -21.417827,
      Longitude: -45.955703,
    });

    await inMemoryGymsRepository.create({
      id: "gym-2",
      title: "Far Gym",
      description: "",
      phone: "",
      latitude: -26.417827,
      Longitude: -50.955703,
    });

    const { gyms } = await fetchNearbyGymsService.execute({
      userLatitude: -21.417827,
      userLongitude: -45.955703,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
