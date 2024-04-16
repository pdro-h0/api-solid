import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./checkin";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let checkInService: CheckInService

describe("CHECKIN SERVICE", () =>{
    beforeEach(() =>{
        inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
        checkInService = new CheckInService(inMemoryCheckInsRepository);
    })

    it("should be able to check in", async () =>{
        const { checkIn } = await checkInService.execute({
            gymId: "gym-1",
            userId: "user-1"
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})