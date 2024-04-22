import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repositoty";
import { PrismaGymsrepository } from "../../repositories/prisma/prisma-gyms-repository";
import { CheckInService } from "../checkin";

export const makeCheckInService = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const prismaGymsrepository = new PrismaGymsrepository();
  const checkInService = new CheckInService(
    prismaCheckInsRepository,
    prismaGymsrepository
  );

  return checkInService;
};
