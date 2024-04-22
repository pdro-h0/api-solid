import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repositoty";

import { GetUserMetricsService } from "../get-user-metrics";

export const makeGetUserMetricsService = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const getUserMetricsService = new GetUserMetricsService(
    prismaCheckInsRepository
  );

  return getUserMetricsService;
};
