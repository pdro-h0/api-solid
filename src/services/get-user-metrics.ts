import { CheckinsRepository } from "../repositories/check-ins-repository";

interface GetUserMetricsServiceParams {
  userId: string;
}

export class GetUserMetricsService {
  constructor(private checksInRepository: CheckinsRepository) {}
  async execute({ userId }: GetUserMetricsServiceParams) {
    const checkInsCount = await this.checksInRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
