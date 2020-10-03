import { addWeeks } from 'date-fns';
// Rota: Receber uma requisição, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

// SoC: Separations of Cocerns (Separação de preoucupações)
// DTO: Data Transfer Object

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
