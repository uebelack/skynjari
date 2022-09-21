import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs-extra';
import { Logger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as mqtt from 'mqtt';
import MeasurementsArrivedEvent from '../measurements/measurements.arrived.event';
import Mqtt from './mqtt.interface';

@Injectable()
class MqttService {
  private readonly logger = new Logger(MqttService.name);

  private brokers: Mqtt[];

  constructor(private configService: ConfigService, private eventEmitter: EventEmitter2) {
    const mqttConfigFile = resolve(this.configService.get('configurationDirectory'), 'mqtt.config.js');
    if (existsSync(mqttConfigFile)) {
      // eslint-disable-next-line no-eval
      const mqttConfig = eval(readFileSync(mqttConfigFile).toString())();
      this.brokers = mqttConfig.brokers;
      this.init();
    }
  }

  private async init() {
    if (this.brokers) {
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
}

export default MqttService;
