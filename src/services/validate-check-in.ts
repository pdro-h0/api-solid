import dayjs from "dayjs";
import { CheckinsRepository } from "../repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidation } from "./errors/late-check-in-validation";

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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.createdAt,
      "minutes"
    );

    if(distanceInMinutesFromCheckInCreation > 20){
      throw new LateCheckInValidation()
    }

    checkIn.validatedAt = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
