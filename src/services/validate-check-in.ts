import { CheckinsRepository } from "../repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ValidateCheckInServiceParams {
  checkInId: string;
}

export class ValidateCheckInService {
  constructor(private checkInsRepository: CheckinsRepository) {}

  async execute({ checkInId }: ValidateCheckInServiceParams) {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validatedAt = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
