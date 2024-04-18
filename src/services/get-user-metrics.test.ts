import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsService } from "./get-user-metrics";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let getUserMetricsService: GetUserMetricsService;

describe("GET USER METRICS", () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    getUserMetricsService = new GetUserMetricsService(
      inMemoryCheckInsRepository
    );
  });

  it("should be able to get check-ins count from metrics", async () =>{
    await inMemoryCheckInsRepository.create({
        gymId: "gym-1",
        userId: "user-01"
    })
    await inMemoryCheckInsRepository.create({
        gymId: "gym-1",
        userId: "user-01"
    })

    const { checkInsCount } = await getUserMetricsService.execute({
        userId: "user-01"
    })

    expect(checkInsCount).toEqual(2)
  })
});
