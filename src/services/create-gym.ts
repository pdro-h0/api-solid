import { GymsRepository } from "../repositories/gym-repository";

interface CreateGymServiceParams {
  title: string;
  description: string | null
  phone: string | null 
  latitude: number 
  Longitude: number
}

export class CreateGymService{
  constructor(private gymsRepository: GymsRepository) {}

  async execute(data: CreateGymServiceParams) {
    const gym = await this.gymsRepository.create({
        title: data.title,
        description: data.description,
        latitude: data.latitude,
        Longitude: data.Longitude,
        phone: data.phone
    })

    return gym
  };
}