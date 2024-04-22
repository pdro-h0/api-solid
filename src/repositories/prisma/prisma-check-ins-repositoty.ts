import { CheckIn, Prisma } from "@prisma/client";
import { CheckinsRepository } from "../check-ins-repository";
import { db } from "../../../lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckinsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await db.checkIn.create({
      data,
    });

    return checkIn;
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await db.checkIn.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }
  async findManyByUserId(userId: string, page: number) {
    const checkIns = await db.checkIn.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }
  async findById(checkInId: string) {
    const checkIn = await db.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    });

    return checkIn;
  }
  async countByUserId(userId: string) {
    const count = await db.checkIn.count({
      where: {
        userId,
      },
    });

    return count;
  }
  async save(data: CheckIn) {
    const checkIn = await db.checkIn.update({
      where: {
        id: data.id,
      },
      data: data,
    });

    return checkIn;
  }
}
