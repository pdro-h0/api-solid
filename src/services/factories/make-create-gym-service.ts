import { PrismaGymsrepository } from "../../repositories/prisma/prisma-gyms-repository";
import { CreateGymService } from "../create-gym";

export const makeCreateGymService = () => {
  const prismaGymsrepository = new PrismaGymsrepository();
  const createGymService = new CreateGymService(prismaGymsrepository);

  return createGymService;
};
