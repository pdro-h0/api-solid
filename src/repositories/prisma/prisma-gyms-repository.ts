import { Gym, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { GymsRepository, findManyNearbyParams } from "../gym-repository";
import { db } from "../../../lib/prisma";

export class PrismaGymsrepository implements GymsRepository {
  async findById(gymId: string) {
    const gym = await db.gym.findUnique({
      where: {
        id: gymId,
      },
    });

    return gym;
  }
  async create(data: Prisma.GymCreateInput) {
    const gym = await db.gym.create({
      data,
    });

    return gym;
  }
  async searchMany(query: string, page: number) {
    const gyms = await db.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }
  async findManyNearby(params: findManyNearbyParams) {
    const gyms = await db.$queryRaw<Gym[]>`
     SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }
}
