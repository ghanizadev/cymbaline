import { DeleteMessageCommand, GetQueueUrlCommand, SQSClient } from '@aws-sdk/client-sqs'

export class AwsService {
    public async getQueueUrl(queueARN: string): Promise<string> {
        const queueName = queueARN.split(':').pop()

        const client = new SQSClient({ region: process.env.AWS_REGION })
        const command = new GetQueueUrlCommand({ QueueName: queueName })

        const response = await client.send(command)
        return response.QueueUrl
    }

    public async deleteMessage(queueUrl: string, receiptHandle: string): Promise<void> {
        const client = new SQSClient({ region: process.env.AWS_REGION })
        const command = new DeleteMessageCommand({
            QueueUrl: queueUrl,
            ReceiptHandle: receiptHandle,
        })

        await client.send(command)
    }
}
