import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  InfluxDB, WriteApi, QueryApi,
} from '@influxdata/influxdb-client';
import InfluxDBService from './influxdb.service';

describe('InfluxDBService', () => {
  let service: InfluxDBService;
  beforeEach(async () => {
    jest.spyOn(ConfigService.prototype, 'get').mockReturnValue({
      url: 'http://influxdb.example.com:8086',
      token: 'skynjari-test',
      bucket: 'skynjari-test-bucket',
    });
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InfluxDBService,
        ConfigService],
    }).compile();

    service = module.get<InfluxDBService>(InfluxDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return write api', () => {
    const writeApi = {};
    jest.spyOn(InfluxDB.prototype, 'getWriteApi').mockReturnValue(writeApi as unknown as WriteApi);
    expect(service.writeApi()).not.toBeNull();
  });

  it('should return query api', () => {
    const queryApi = {};
    jest.spyOn(InfluxDB.prototype, 'getQueryApi').mockReturnValue(queryApi as unknown as QueryApi);
    expect(service.queryApi()).not.toBeNull();
  });

  it('should return bucket', () => {
    expect(service.bucket()).toEqual('skynjari-test-bucket');
  });
});
