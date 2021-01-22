// Rota: Receber uma requisição, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controller/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// SoC: Separations of Cocerns (Separação de preoucupações)
// DTO: Data Transfer Object

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//  const appointments = await appointmentsRepository.find();
//
//  return res.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
