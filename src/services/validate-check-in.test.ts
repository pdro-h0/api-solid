import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInService } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidation } from "./errors/late-check-in-validation";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let validateCheckInService: ValidateCheckInService;

describe("VALIDATE CHECK IN", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    validateCheckInService = new ValidateCheckInService(
      inMemoryCheckInsRepository
    );

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validade check-in", async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gymId: "gym-1",
      userId: "user-01",
    });

    const { checkIn } = await validateCheckInService.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validatedAt).toEqual(expect.any(Date));
    expect(inMemoryCheckInsRepository.items[0].validatedAt).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able to validate an inexistent check-in", async () => {
    const createdCheckin = await inMemoryCheckInsRepository.create({
      gymId: "gym-1",
      userId: "user-01",
    });

    await expect(() =>
      validateCheckInService.execute({
        checkInId: "non-existin-check-in-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("Should not be able to validate check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 14, 40));

    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gymId: "gym-1",
      userId: "user-01",
    });

    const twentyOneMinutes = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutes);

    await expect(() =>
      validateCheckInService.execute({
        checkInId: createdCheckIn.id,
      })
    ).rejects.toBeInstanceOf(LateCheckInValidation);
  });
});
