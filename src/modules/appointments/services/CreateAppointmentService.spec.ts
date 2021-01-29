import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeApointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('shold be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '13071983',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('13071983');
  });

  it('should not able to create two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '13071983',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '13071983',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
