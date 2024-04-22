import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repositoty";
import { FetchUserCheckInHistorySerive } from "../fetch-user-check-ins-history";

export const makeFetchUserCheckInHistoryService = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const fetchUserCheckInHistorySerive = new FetchUserCheckInHistorySerive(
    prismaCheckInsRepository
  );

  return fetchUserCheckInHistorySerive;
};
