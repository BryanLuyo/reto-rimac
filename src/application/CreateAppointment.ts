import { AppointmentRepository } from '../domain/repositories/AppointmentRepository';
import { Appointment } from '../domain/entities/Appointment';
import { v4 as uuidv4 } from 'uuid';
import { SNS } from 'aws-sdk';

const sns = new SNS();

export class CreateAppointment {
  constructor(private repo: AppointmentRepository) {}

  async execute(input: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Promise<void> {
    // TODO: implementar la lógica real de creación de citas
    const appointment: Appointment = {
      ...input,
      id: uuidv4(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    await this.repo.save(appointment);
    const topic = input.countryISO === 'PE' ? process.env.SNS_TOPIC_PE! : process.env.SNS_TOPIC_CL!;
    await sns.publish({
      TopicArn: `arn:aws:sns:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:${topic}`,
      Message: JSON.stringify(appointment)
    }).promise();
  }
}
