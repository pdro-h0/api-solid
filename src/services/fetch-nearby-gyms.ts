import { GymsRepository } from "../repositories/gym-repository";

interface FetchNearbyGymsServiceParams {
  userLatitude: number;
  userLongitude: number;
}

export class FetchNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ userLatitude, userLongitude }: FetchNearbyGymsServiceParams) {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
