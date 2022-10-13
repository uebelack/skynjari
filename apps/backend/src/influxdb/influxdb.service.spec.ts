import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { InfluxDB, WriteApi, Point } from '@influxdata/influxdb-client';
import InfluxDBService from './influxdb.service';

describe('InfluxDBService', () => {
  let service: InfluxDBService;
  beforeEach(async () => {
    jest.spyOn(ConfigService.prototype, 'get').mockReturnValue({ url: 'http://influxdb.example.com:8086', token: 'skynjari' });
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

  it('should store points', () => {
    const writeApi = {
      writePoint: jest.fn(),
      close: jest.fn(),
    };

    jest.spyOn(InfluxDB.prototype, 'getWriteApi').mockReturnValue(writeApi as unknown as WriteApi);

    const timestamp = new Date();
    service.storePoint(
      'power-meter',
      timestamp,
      { building: 'main', sensorKey: 'power-meter' },
      { consumption: 342.32, totalizer: 123456.78 },
    );

    expect(writeApi.writePoint).toBeCalledWith(
      new Point('power-meter')
        .timestamp(timestamp)
        .tag('sensorKey', 'power-meter')
        .tag('building', 'main')
        .floatField('consumption', 342.32)
        .floatField('totalizer', 123456.78),
    );
  });
});
