import { GymsRepository } from "../repositories/gym-repository";

interface SearchGymsServiceParams{
    query: string
    page: number
}

export class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, page }: SearchGymsServiceParams) {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
        gyms,
    }
  }
}