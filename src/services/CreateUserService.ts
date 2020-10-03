import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/user';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<void> {
    const usersRepository = getRepository(User);

    const chekUserExist = await usersRepository.findOne({
      where: { email },
    });

    if (chekUserExist) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
