import {
  Logger, Injectable,
} from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { ConfigService } from '@nestjs/config';
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

  async storePoint(measurement: string, timestamp: Date, tags: Record<string, string>, values: Record<string, number>) {
    const point = new Point(measurement);

    point.timestamp(timestamp);

    Object.keys(tags).forEach((key) => {
      point.tag(key, tags[key]);
    });

    Object.keys(values).forEach((key) => {
      point.floatField(key, values[key]);
    });

    const writeApi = this.createWriteApi();
    writeApi.writePoint(point);
    await writeApi.close();
  }
}

export default InfluxDBService;
