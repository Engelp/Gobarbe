// Rota: Receber uma requisição, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

// SoC: Separations of Cocerns (Separação de preoucupações)
// DTO: Data Transfer Object

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
