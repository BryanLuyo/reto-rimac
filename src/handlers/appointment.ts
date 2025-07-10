import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoAppointmentRepository } from '../infrastructure/repositories/DynamoAppointmentRepository';
import { CreateAppointment } from '../application/CreateAppointment';
import { GetAppointments } from '../application/GetAppointments';

const repo = new DynamoAppointmentRepository();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // TODO: validar parámetros y manejar errores adecuadamente
  try {
    if (event.requestContext.http.method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const usecase = new CreateAppointment(repo);
      await usecase.execute(body);
      return { statusCode: 202, body: JSON.stringify({ message: 'processing' }) };
    }
    if (event.requestContext.http.method === 'GET' && event.pathParameters) {
      const insuredId = event.pathParameters['insuredId'];
      const usecase = new GetAppointments(repo);
      const items = await usecase.execute(insuredId);
      return { statusCode: 200, body: JSON.stringify(items) };
    }
    return { statusCode: 400, body: 'Bad Request' };
  } catch (err) {
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};
