'use strict'
import KafkaService from "./kafka.service.js";
const configExample = {
    brokers: ['localhost:9092']
};
// Usage
const kafkaService = new KafkaService(configExample);
kafkaService.connect();
// producer
await kafkaService.createProducer();
await kafkaService.sendToTopic('topic', 'key', 'value');
// consumer
kafkaService.createConsumer();
await kafkaService.subscribe('topic');
await kafkaService.sendToTopic('topic', 'key', 'value');
