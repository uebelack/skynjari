import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementsArrivedEvent } from '@skynjari/data-model';
import { InfluxDB, WriteApi, Point } from '@influxdata/influxdb-client';
import InfluxDBService from './influxdb.service';

describe('InfluxDBService', () => {
  let service: InfluxDBService;

  beforeEach(async () => {
    jest.spyOn(ConfigService.prototype, 'get').mockReturnValue({ url: 'http://influxdb.example.com:8086', token: 'skynjari' });
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfluxDBService, ConfigService],
    }).compile();

    service = module.get<InfluxDBService>(InfluxDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle measurements arrived event', async () => {
    const writeApi = {
      writePoints: jest.fn(),
      close: jest.fn(),
    };

    jest.spyOn(InfluxDB.prototype, 'getWriteApi').mockReturnValue(writeApi as unknown as WriteApi);

    const timestamp = new Date();
    const event = new MeasurementsArrivedEvent(
      'power-meter',
      timestamp,
      {
        consumption: 342.32,
        totalizer: 123456.78,
      },
    );

    await service.handleMeasurementsArrivedEvent(event);

    expect(writeApi.writePoints).toBeCalledWith([
      new Point('consumption').tag('sensor', 'power-meter').floatField('value', 342.32),
      new Point('totalizer').tag('sensor', 'power-meter').floatField('value', 123456.78),
    ]);

    expect(writeApi.close).toBeCalled();
  });

  it('should handle errors and log it while handleMeasurementsArrivedEvent', async () => {
    const error = new Error('Something went wrong');
    const writeApi = {
      writePoints: () => { throw error; },
    };

    jest.spyOn(InfluxDB.prototype, 'getWriteApi').mockReturnValue(writeApi as unknown as WriteApi);

    const loggingSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation(() => true);

    const timestamp = new Date();
    const event = new MeasurementsArrivedEvent(
      'power-meter',
      timestamp,
      {
        consumption: 342.32,
        totalizer: 123456.78,
      },
    );

    await service.handleMeasurementsArrivedEvent(event);
    expect(loggingSpy).toBeCalledWith(error);
  });
});
