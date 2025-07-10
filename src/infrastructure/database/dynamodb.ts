import { DynamoDB } from 'aws-sdk';

export const dynamo = new DynamoDB.DocumentClient();
