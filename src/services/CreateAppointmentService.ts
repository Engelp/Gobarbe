import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import AppError from '../errors/AppError';

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
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // startOfHour: Regra de negócio, o atendimento só pode ser agendado de hora em hora.

    const appointmentDate = startOfHour(date);

    // Parâmetro para procurar um data e verificar se a data esta disponível

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    // Se não estiver data disponínel, retorne um erro.

    if (findAppointmentInSameDate) {
      throw new AppError('is apThpointment is already booked');
    }

    // Cria o agendamento

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
