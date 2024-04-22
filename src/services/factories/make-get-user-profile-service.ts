import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { GetUserService } from "../get-user-profile";

export const makeGetUserProfileServie = () => {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUserService = new GetUserService(prismaUsersRepository);

  return getUserService;
};
