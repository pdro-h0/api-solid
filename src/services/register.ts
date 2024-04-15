import { hash } from "bcryptjs";
import { UsersRepository } from "../repositories/user-repository";
import { UserAlreadyExists } from "./errors/user-already-exists-error";

import { User } from "@prisma/client"

interface RegisterServiceParams {
  name: string;
  email: string;
  password: string;
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  //   private usersRepository: any;
  //   constructor(usersRepository: any){
  //     this.usersRepository = usersRepository
  //   } OU
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterServiceParams) {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExists();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    });

    return {
      user,
    }
  }
}
