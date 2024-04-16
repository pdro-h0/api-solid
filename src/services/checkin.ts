import { CheckinsRepository } from "../repositories/check-ins-repository";

interface CheckinServiceParams {
  userId: string;
  gymId: string;
}

export class CheckInService {
  constructor(private checkinsRepository: CheckinsRepository) {}

  async execute({ userId, gymId }: CheckinServiceParams) {
    const checkIn = await this.checkinsRepository.create({
      gymId,
      userId,
    });

    return {
      checkIn
    };
  }
}
