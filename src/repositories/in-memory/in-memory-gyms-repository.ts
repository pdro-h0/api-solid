import { randomUUID } from "crypto";
import { GymsRepository, findManyNearbyParams } from "../gym-repository";
import { Gym, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { getDistanceBetweenCoordinates } from "../../utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements GymsRepository {
  public itens: Gym[] = [];

  async findById(gymId: string) {
    const gym = this.itens.find((item) => item.id === gymId);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      Longitude: new Decimal(data.Longitude.toString()),
      createdAt: new Date(),
    };

    this.itens.push(gym);

    return gym;
  }

  async searchMany(query: string, page: number) {
    return await this.itens
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(params: findManyNearbyParams){
    return this.itens.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {latitude: params.latitude, longitude: params.longitude},
        {latitude: +item.latitude, longitude: +item.Longitude}
      )

      return distance < 10
    })
  }
}
