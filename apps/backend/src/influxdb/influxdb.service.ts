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

  bucket() {
    return this.influxDBConfig.bucket;
  }

  writeApi() {
    return this.client.getWriteApi(this.influxDBConfig.org, this.influxDBConfig.bucket);
  }

  queryApi() {
    return this.client.getQueryApi(this.influxDBConfig.org);
  }
}

export default InfluxDBService;
