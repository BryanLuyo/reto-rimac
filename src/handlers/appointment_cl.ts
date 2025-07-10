import { SQSEvent } from 'aws-lambda';
import { RDS, EventBridge } from 'aws-sdk';

const rds = new RDS();
const eventBridge = new EventBridge();

export const handler = async (event: SQSEvent): Promise<void> => {
  // TODO: implementar almacenamiento en RDS y envío a EventBridge
  for (const record of event.Records) {
    const appointment = JSON.parse(record.body);
    // aquí se guardaría el registro en la base de datos MySQL de Chile
    await rdsDataPlaceholder(appointment);
    await eventBridge.putEvents({
      Entries: [
        {
          Source: 'appointment.complete',
          DetailType: 'appointment',
          Detail: JSON.stringify({ id: appointment.id })
        }
      ]
    }).promise();
  }
};

async function rdsDataPlaceholder(data: unknown) {
  // TODO: conectar a RDS y guardar la cita
  console.log('Saving CL appointment', data);
}
