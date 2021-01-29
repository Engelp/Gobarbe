import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUserService';

describe('CreateUser', () => {
  it('shold be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsers = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUsers.execute({
      name: 'Elson Pinheiro',
      email: 'engelp@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('shold not be able to create a ne user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsers = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUsers.execute({
      name: 'Elson Pinheiro',
      email: 'engelp@gmail.com',
      password: '123456',
    });

    expect(
      createUsers.execute({
        name: 'Elson Pinheiro',
        email: 'engelp@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
