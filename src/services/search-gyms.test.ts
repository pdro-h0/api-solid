import { beforeEach, describe, expect, it } from "vitest";

import { SearchGymsService } from "./search-gyms";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";

let inMemoryGymsRepository: InMemoryGymsRepository;
let searchGymsService: SearchGymsService;

describe("SEARCH GYMS", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    searchGymsService = new SearchGymsService(inMemoryGymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await inMemoryGymsRepository.create({
      id: "gym-1",
      title: "gym-1",
      description: "",
      phone: "",
      latitude: -21.417827,
      Longitude: -45.955703,
    });
    await inMemoryGymsRepository.create({
      id: "gym-2",
      title: "gym-2",
      description: "",
      phone: "",
      latitude: -22.417827,
      Longitude: -46.955703,
    });

    const { gyms } = await searchGymsService.execute({
      query: "2",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "gym-2" })]);
  });

  it("should ble able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        id: `gym-${i}`,
        title: `typescript gym-${i}`,
        description: "",
        phone: "",
        latitude: -21.417827,
        Longitude: -45.955703,
      });
    }

    const { gyms } = await searchGymsService.execute({
      query: "typescript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "typescript gym-21" }),
      expect.objectContaining({ title: "typescript gym-22" }),
    ]);
  });
});
