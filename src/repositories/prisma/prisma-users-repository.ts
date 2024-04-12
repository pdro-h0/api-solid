import { Prisma } from "@prisma/client";
import { db } from "../../../lib/prisma";
import { UsersRepository } from "../user-repository";

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await db.user.create({
      data,
    });

    return user;
  }
}
