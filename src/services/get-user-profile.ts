import { UsersRepository } from "../repositories/user-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserServiceParams {
  userId: string;
}

export class GetUserService {
  constructor(private userRepository: UsersRepository) {}

  async execute({ userId }: GetUserServiceParams) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
