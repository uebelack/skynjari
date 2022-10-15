import { ConfigService } from '@nestjs/config';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PubSub } from 'graphql-subscriptions';
import MeasurementsService from '../measurements/measurements.service';
import MeasurementsArrivedEvent from '../measurements/measurements-arrived.event';
import Sensor from './sensor.type';

@Injectable()
class SensorsService {
  private readonly logger = new Logger(SensorsService.name);

  sensors: Sensor[] = [];

  constructor(
    private configService: ConfigService,
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
    private measurementsService: MeasurementsService,
  ) {
    this.sensors = this.configService.get('sensors') || [];
    this.loadLatestMeasurements();
  }

  private async loadLatestMeasurements(sensorIndex = 0) {
    if (this.sensors.length > sensorIndex) {
      if (this.sensors[sensorIndex].measurements.length > 0) {
        await this.measurementsService.loadLatestMeasurements(this.sensors[sensorIndex]);
        await this.measurementsService.calculateTransientMeasurements(this.sensors[sensorIndex]);
      }
      this.loadLatestMeasurements(sensorIndex + 1);
    }
  }

  async findAll(): Promise<Sensor[]> {
    return Promise.resolve(this.sensors);
  }

  async findByKey(key: string): Promise<Sensor> {
    return Promise.resolve(this.sensors.find((sensor) => sensor.key === key));
  }

  @OnEvent(MeasurementsArrivedEvent.KEY, { async: true })
  async handleMeasurementsArrivedEvent(event: MeasurementsArrivedEvent) {
    const sensor = await this.findByKey(event.sensorKey);
    if (sensor && sensor.measurements) {
      const tags = { sensorKey: sensor.key };

      if (sensor.tags) {
        sensor.tags.forEach((tag) => {
          tags[tag.key] = tag.value;
        });
      }

      await this.measurementsService.storeMeasurements(sensor, event.timestamp, event.measurements);

      sensor.updated = new Date(event.timestamp);
      Object.keys(event.measurements).forEach((key) => {
        const measurement = sensor.measurements.find((m) => m.key === key);
        if (measurement) {
          measurement.value = event.measurements[key];
        }
      });

      await this.measurementsService.calculateTransientMeasurements(sensor);
      this.pubSub.publish('sensorUpdated', { sensorUpdated: sensor });
    }
  }
}

export default SensorsService;
