import { AppointmentRepository } from '../domain/repositories/AppointmentRepository';
import { Appointment } from '../domain/entities/Appointment';

export class GetAppointments {
  constructor(private repo: AppointmentRepository) {}
  async execute(insuredId: string): Promise<Appointment[]> {
    // TODO: implementar consulta de citas
    return this.repo.findByInsuredId(insuredId);
  }
}
