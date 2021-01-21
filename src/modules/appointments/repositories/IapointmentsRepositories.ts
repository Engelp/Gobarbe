import Apoointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Apoointment>;
  findByDate(date: Date): Promise<Apoointment | undefined>;
}
