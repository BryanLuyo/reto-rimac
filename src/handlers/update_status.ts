import { SQSEvent } from 'aws-lambda';
import { DynamoAppointmentRepository } from '../infrastructure/repositories/DynamoAppointmentRepository';

const repo = new DynamoAppointmentRepository();

export const handler = async (event: SQSEvent): Promise<void> => {
  // TODO: actualizar el estado en DynamoDB cuando llegue el mensaje
  for (const record of event.Records) {
    const { id } = JSON.parse(record.body);
    await repo.updateStatus(id, 'completed');
  }
};
