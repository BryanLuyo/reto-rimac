import { Appointment } from '../entities/Appointment';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  findByInsuredId(insuredId: string): Promise<Appointment[]>;
  updateStatus(id: string, status: 'completed'): Promise<void>;
}
