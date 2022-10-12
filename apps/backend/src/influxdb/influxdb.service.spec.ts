import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { InfluxDB, WriteApi, Point } from '@influxdata/influxdb-client';
import { SensorType } from '@skynjari/data-model';
import MeasurementsArrivedEvent from '../measurements/measurements-arrived.event';
import InfluxDBService from './influxdb.service';
import SensorsService from '../sensors/sensors.service';

describe('InfluxDBService', () => {
  let service: InfluxDBService;
  const sensorsService = { findByKey: jest.fn() };
  beforeEach(async () => {
    jest.spyOn(ConfigService.prototype, 'get').mockReturnValue({ url: 'http://influxdb.example.com:8086', token: 'skynjari' });
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfluxDBService, ConfigService, { provide: SensorsService, useValue: sensorsService }],
    }).compile();

    service = module.get<InfluxDBService>(InfluxDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle measurements arrived event', async () => {
    const writeApi = {
      writePoint: jest.fn(),
      close: jest.fn(),
    };

    sensorsService.findByKey.mockReturnValue({ type: SensorType.POWER_METER });
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

    expect(writeApi.writePoint).toBeCalledWith(
      new Point('power-meter').tag('sensor', 'power-meter').floatField('consumption', 342.32).floatField('totalizer', 123456.78),
    );

    expect(writeApi.close).toBeCalled();
  });

  it('should handle errors and log it while handleMeasurementsArrivedEvent', async () => {
    const error = new Error('Something went wrong');
    const writeApi = {
      writePoint: () => { throw error; },
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
