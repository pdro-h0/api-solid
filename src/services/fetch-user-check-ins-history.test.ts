import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInHistorySerive } from "./fetch-user-check-ins-history";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let fetchUserCheckInHistorySerive: FetchUserCheckInHistorySerive;

describe("fetch-user-check-ins-history", () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    fetchUserCheckInHistorySerive = new FetchUserCheckInHistorySerive(
      inMemoryCheckInsRepository
    );
  });

  it("should be able to fetch check-in history", async () => {
    await inMemoryCheckInsRepository.create({
      gymId: "gym-1",
      userId: "user-01",
    });

    await inMemoryCheckInsRepository.create({
      gymId: "gym-2",
      userId: "user-01",
    });

    const { checkIns } = await fetchUserCheckInHistorySerive.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: "gym-1" }),
      expect.objectContaining({ gymId: "gym-2" }),
    ]);
  });

  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        gymId: `gym-${i}`,
        userId: "user-01",
      });
    }

    const { checkIns } = await fetchUserCheckInHistorySerive.execute({
        userId: "user-01",
        page: 2
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
        expect.objectContaining({ gymId: "gym-21" }),
        expect.objectContaining({ gymId: "gym-22" })
    ])
  });
});
