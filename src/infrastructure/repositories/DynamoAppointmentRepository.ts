import { AppointmentRepository } from '../../domain/repositories/AppointmentRepository';
import { Appointment } from '../../domain/entities/Appointment';
import { dynamo } from '../database/dynamodb';

const TableName = process.env.DYNAMO_TABLE as string;

export class DynamoAppointmentRepository implements AppointmentRepository {
  async save(appointment: Appointment): Promise<void> {
    // TODO: guardar cita en DynamoDB
    await dynamo.put({ TableName, Item: appointment }).promise();
  }

  async findByInsuredId(insuredId: string): Promise<Appointment[]> {
    // TODO: consultar citas por insuredId
    const result = await dynamo.query({
      TableName,
      IndexName: 'InsuredIndex',
      KeyConditionExpression: 'insuredId = :i',
      ExpressionAttributeValues: { ':i': insuredId }
    }).promise();
    return (result.Items || []) as Appointment[];
  }

  async updateStatus(id: string, status: 'completed'): Promise<void> {
    // TODO: actualizar el estado de la cita
    await dynamo.update({
      TableName,
      Key: { id },
      UpdateExpression: 'set #s = :s',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: { ':s': status }
    }).promise();
  }
}
