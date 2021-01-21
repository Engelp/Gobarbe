import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

import User from '../infra/typeorm/entities/user';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const chekUserExist = await this.usersRepository.findByEmail(email);

    if (chekUserExist) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
