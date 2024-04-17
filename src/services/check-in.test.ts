import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./checkin";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let inMemoryGymsRepository: InMemoryGymsRepository;
let checkInService: CheckInService;

describe("CHECKIN SERVICE", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    inMemoryGymsRepository = new InMemoryGymsRepository();
    checkInService = new CheckInService(
      inMemoryCheckInsRepository,
      inMemoryGymsRepository
    );

    await inMemoryGymsRepository.create({
      id: "gym-1",
      title: "gym-1",
      description: "",
      phone: "",
      latitude: -21.417827,
      Longitude: -45.955703,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await checkInService.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -21.417827,
      userLongitude: -45.955703,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await checkInService.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -21.417827,
      userLongitude: -45.955703,
    });

    await expect(() =>
      checkInService.execute({
        gymId: "gym-1",
        userId: "user-1",
        userLatitude: -21.417827,
        userLongitude: -45.955703,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check twice but in different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await checkInService.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -21.417827,
      userLongitude: -45.955703,
    });

    vi.setSystemTime(new Date(2023, 0, 28, 8, 0, 0));
    const { checkIn } = await checkInService.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -21.417827,
      userLongitude: -45.955703,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    inMemoryGymsRepository.itens.push({
      id: "gym-2",
      title: "gym 02",
      description: "",
      phone: "",
      latitude: new Decimal(-21.417827),
      Longitude: new Decimal(-45.955703),
    });

    await expect(() =>
      checkInService.execute({
        gymId: "gym-2",
        userId: "user-1",
        userLatitude: -21.517827,
        userLongitude: -46.055703,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
