import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IapointmentsRepositories';

/**
 * Recebimento das informações
 * Tratativa de erro/excessões
 * Acesso ao repositório
 */

interface Request {
  provider_id: string;
  date: Date;
}

/**
 * SOLID
 * Single Responsability Principle
 * Dependecy Inversion Principle
 */

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    // startOfHour: Regra de negócio, o atendimento só pode ser agendado de hora em hora.

    const appointmentDate = startOfHour(date);

    // Parâmetro para procurar um data e verificar se a data esta disponível

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    // Se não estiver data disponínel, retorne um erro.

    if (findAppointmentInSameDate) {
      throw new AppError('is apThpointment is already booked');
    }

    // Cria o agendamento

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
