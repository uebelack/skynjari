import { Logger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';
import Mqtt from './mqtt.interface';

@Injectable()
class MqttService {
  private readonly logger = new Logger(MqttService.name);

  brokers: Mqtt[];

  constructor(private configService: ConfigService) {
    this.brokers = configService.get('brokers');
    this.start();
  }

  start(): void {
    this.brokers.forEach((broker) => {
      this.logger.log(`Connecting to ${broker.url}...`);
      const client = mqtt.connect(broker.url, broker.options);
      client.on('connect', () => {
        client.subscribe(broker.inboundTopic, (error) => {
          if (error) {
            this.logger.error(error);
          } else {
            this.logger.log(`Connected to ${broker.url} 😀`);
          }
        });
      });

      client.on('message', (topic, message) => {
        this.logger.debug(message.toString());
      });
    });
  }
}

export default MqttService;
