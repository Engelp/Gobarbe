// Rota: Receber uma requisição, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

// SoC: Separations of Cocerns (Separação de preoucupações)
// DTO: Data Transfer Object

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
