import { Gym, Prisma } from "@prisma/client";

export interface findManyNearbyParams {
  longitude: number;
  latitude: number;
}
export interface GymsRepository {
  findById(gymId: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findManyNearby(params: findManyNearbyParams): Promise<Gym[]>;
}
