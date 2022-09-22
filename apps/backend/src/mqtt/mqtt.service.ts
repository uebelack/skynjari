import { Logger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as mqtt from 'mqtt';
import MeasurementsArrivedEvent from '../measurements/measurements.arrived.event';
import MqttBroker from './mqtt-broker.interface';

@Injectable()
class MqttService {
  private readonly logger = new Logger(MqttService.name);

  private brokers: MqttBroker[];

  constructor(private configService: ConfigService, private eventEmitter: EventEmitter2) {
    this.brokers = configService.get('brokers') || [];
    this.init();
  }

  private async init() {
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
        const event = new MeasurementsArrivedEvent();
        event.sensorKey = topic.split('/').pop();
        event.measurements = {};
        const measurements = JSON.parse(message.toString());
        Object.keys(measurements).forEach((key) => {
          event.measurements[key] = parseFloat(measurements[key]);
        });
        this.eventEmitter.emit(MeasurementsArrivedEvent.KEY, event);
      });
    });
  }
}

export default MqttService;
