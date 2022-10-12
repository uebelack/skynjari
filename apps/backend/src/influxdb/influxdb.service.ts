import {
  Logger, Injectable,
} from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import SensorsService from '../sensors/sensors.service';
import MeasurementsArrivedEvent from '../measurements/measurements-arrived.event';
import InfluxDBConfig from './influxdb.config.interface';

@Injectable()
class InfluxDBService {
  private readonly logger = new Logger(InfluxDBService.name);

  private client: InfluxDB;

  private influxDBConfig: InfluxDBConfig;

  constructor(private configService: ConfigService, private sensorsService: SensorsService) {
    this.influxDBConfig = this.configService.get('influxdb') as InfluxDBConfig;
    this.client = new InfluxDB({ url: this.influxDBConfig.url, token: this.influxDBConfig.token });
  }

  createWriteApi() {
    return this.client.getWriteApi(this.influxDBConfig.org, this.influxDBConfig.bucket);
  }

  @OnEvent(MeasurementsArrivedEvent.KEY, { async: true })
  async handleMeasurementsArrivedEvent(event: MeasurementsArrivedEvent) {
    try {
      const sensor = await this.sensorsService.findByKey(event.sensorKey);
      if (sensor) {
        const point = new Point(sensor.type.toString());
        point.tag('sensor', event.sensorKey);

        Object.keys(event.measurements).forEach((key) => {
          point.floatField(key, event.measurements[key]);
        });

        const writeApi = this.createWriteApi();
        writeApi.writePoint(point);
        await writeApi.close();
      }
    } catch (e) {
      this.logger.error(e);
    }
  }
}

export default InfluxDBService;
