import { CheckinsRepository } from "../repositories/check-ins-repository";

interface FetchUserCheckInHistorySeriveParams {
  userId: string;
  page: number;
}

export class FetchUserCheckInHistorySerive {
  constructor(private checkInRepository: CheckinsRepository) {}

  async execute({ userId, page }: FetchUserCheckInHistorySeriveParams) {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page);

    return {
      checkIns,
    };
  }
}
