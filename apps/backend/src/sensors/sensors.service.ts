import { ConfigService } from '@nestjs/config';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PubSub } from 'graphql-subscriptions';
import InfluxDBService from '../influxdb/influxdb.service';
import MeasurementsArrivedEvent from '../measurements/measurements-arrived.event';
import Sensor from './sensor.type';

@Injectable()
class SensorsService {
  private readonly logger = new Logger(InfluxDBService.name);

  sensors: Sensor[] = [];

  constructor(
    private configService: ConfigService,
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
    private influxDBService: InfluxDBService,
  ) {
    this.sensors = this.configService.get('sensors') || [];
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

      await this.influxDBService.storePoint(
        sensor.type.toString(),
        new Date(event.timestamp),
        tags,
        event.measurements,
      );

      sensor.updated = new Date(event.timestamp);
      Object.keys(event.measurements).forEach((key) => {
        const measurement = sensor.measurements.find((m) => m.key === key);
        if (measurement) {
          measurement.value = event.measurements[key];
        }
      });

      this.pubSub.publish('sensorUpdated', { sensorUpdated: sensor });
    }
  }
}

export default SensorsService;
