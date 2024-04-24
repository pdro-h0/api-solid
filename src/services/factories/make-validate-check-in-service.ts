import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repositoty";
import { ValidateCheckInService } from "../validate-check-in";

export const makeValidateService = () => {
  const prismacheckInsrepository = new PrismaCheckInsRepository();
  const validateCheckInService = new ValidateCheckInService(
    prismacheckInsrepository
  );

  return validateCheckInService;
};
