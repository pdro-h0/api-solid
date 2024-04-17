import { CheckinsRepository } from "../repositories/check-ins-repository";
import { GymsRepository } from "../repositories/gym-repository";
import { getDistanceBetweenCoordinates } from "../utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckinServiceParams {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

export class CheckInService {
  constructor(
    private checkinsRepository: CheckinsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckinServiceParams) {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: +gym.latitude,
        longitude: +gym.Longitude,
      }
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }
    const checkInOnSameDay = await this.checkinsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkinsRepository.create({
      gymId,
      userId,
    });

    return {
      checkIn,
    };
  }
}
