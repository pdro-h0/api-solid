import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/user-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateParams {
  email: string;
  password: string;
}

export class AuthenticateService {
  constructor(private userRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateParams) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.passwordHash);

    if (doesPasswordMatches === false) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
