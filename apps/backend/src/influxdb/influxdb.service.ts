import {
  Logger, Injectable,
} from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { MeasurementsArrivedEvent } from '@skynjari/data-model';
import InfluxDBConfig from './influxdb.config.interface';

@Injectable()
class InfluxDBService {
  private readonly logger = new Logger(InfluxDBService.name);

  private client: InfluxDB;

  private influxDBConfig: InfluxDBConfig;

  constructor(private configService: ConfigService) {
    this.influxDBConfig = this.configService.get('influxdb') as InfluxDBConfig;
    this.client = new InfluxDB({ url: this.influxDBConfig.url, token: this.influxDBConfig.token });
  }

  createWriteApi() {
    return this.client.getWriteApi(this.influxDBConfig.org, this.influxDBConfig.bucket);
  }

  @OnEvent(MeasurementsArrivedEvent.KEY, { async: true })
  async handleMeasurementsArrivedEvent(event: MeasurementsArrivedEvent) {
    try {
      const points = Object.keys(event.measurements).map((key) => new Point(key)
        .tag('sensor', event.sensorKey)
        .floatField('value', event.measurements[key]));

      const writeApi = this.createWriteApi();
      writeApi.writePoints(points);
      await writeApi.close();
    } catch (e) {
      this.logger.error(e);
    }
  }
}

export default InfluxDBService;
