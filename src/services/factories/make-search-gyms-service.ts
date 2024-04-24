import { PrismaGymsrepository } from "../../repositories/prisma/prisma-gyms-repository";
import { SearchGymsService } from "../search-gyms";

export const makeSearchGymsService = () => {
  const prismaGymsrepository = new PrismaGymsrepository();
  const searchGymsService = new SearchGymsService(prismaGymsrepository);

  return searchGymsService;
};
