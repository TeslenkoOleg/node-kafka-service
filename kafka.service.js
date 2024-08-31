'use strict'
import { Kafka } from 'kafkajs';
class KafkaService {
    constructor (config) {
        this.config = config;
        this.kafka = null;
        this.producer = null;
        this.consumer = null;
    }

    /**
     * @function connect
     * @description connect to kafka
     * @return {void}
     */
    connect () {
        this.kafka = new Kafka({
            clientId: 'kafka-app',
            brokers: this.config.brokers,
            authenticationTimeout: 5000,
            connectionTimeout: 5000
        });
    }

    /**
     * @function createProducer
     * @description create producer
     * @return {Promise<void>}
     */
    async createProducer () {
        try {
            this.producer = this.kafka.producer();
            await this.producer.connect();
        } catch (e) {
            console.log('ERROR KAFKA createProducer', e)
        }
    }

    /**
     * @function sendToTopic
     * @param topic {string}
     * @param key {string}
     * @param value {string}
     * @return {Promise<void>}
     */
    async sendToTopic (topic, key, value) {
        try {
            await this.producer.send({
                topic: topic,
                messages: [
                    { key: key, value: value },
                ],
        })
        } catch (e) {
            console.log('ERROR KAFKA sendToTopics', e);
        }
    }

    /**
     * @function createConsumer
     * @description create consumer
     * @return {void}
     */
    createConsumer () {
        this.consumer = this.kafka.consumer({ groupId: 'kafka-group' });
    }

    /**
     * @function subscribe
     * @param topic {string}
     * @return {Promise<void>}
     */
    async subscribe (topic) {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: topic, fromBeginning: true});
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    console.log('message', message);
                },
            })
        } catch (e) {
            console.log('ERROR KAFKA subscribe', e);
        }
    }
}
export default KafkaService;
