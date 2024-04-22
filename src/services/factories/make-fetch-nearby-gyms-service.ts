import { PrismaGymsrepository } from "../../repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsService } from "../fetch-nearby-gyms";

export const makeFetchNearbyGymsService = () => {
  const prismaGymsrepository = new PrismaGymsrepository();
  const fetchNearbyGymsService = new FetchNearbyGymsService(
    prismaGymsrepository
  );

  return fetchNearbyGymsService;
};
