import { GymsRepository } from "../gym-repository";
import { Gym } from "@prisma/client";

export class InMemoryGymsRepository implements GymsRepository {
  public itens: Gym[] = [];

  async findById(gymId: string) {
    const gym = this.itens.find((item) => item.id === gymId);

    if (!gym) {
      return null;
    }

    return gym
  }
}
