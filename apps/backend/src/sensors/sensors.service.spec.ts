import { ConfigService } from '@nestjs/config';
import { SensorType } from '@skynjari/data-model';
import { Test, TestingModule } from '@nestjs/testing';
import InfluxDBService from '../influxdb/influxdb.service';
import MeasurementsArrivedEvent from '../measurements/measurements-arrived.event';
import sensorConfig from './sensors.config.fixture';

import SensorsService from './sensors.service';

describe('SensorsService', () => {
  let service: SensorsService;
  const influxDBService = { storePoint: jest.fn() };
  beforeEach(async () => {
    jest.spyOn(ConfigService.prototype, 'get').mockReturnValue(sensorConfig.sensors);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: 'PUB_SUB', useValue: { publish: jest.fn() } },
        SensorsService,
        ConfigService,
        { provide: InfluxDBService, useValue: influxDBService },
      ],
    }).compile();

    service = module.get<SensorsService>(SensorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all sensors', async () => {
    expect((await service.findAll()).length).toEqual(3);
  });

  it('should return sensor for key', async () => {
    expect(await (await service.findByKey('power-meter')).name).toEqual('Power');
  });

  it('should update measurements on sensors', async () => {
    expect(await service.findByKey('power-meter')).toEqual({
      key: 'power-meter',
      name: 'Power',
      type: SensorType.POWER_METER,
      tags: [
        { key: 'building', value: 'main' },
      ],
      measurements: [{
        key: 'consumption',
        name: 'Consumption',
        unit: 'Wh',
      }, {
        key: 'totalizer',
        name: 'Totalizer',
        unit: 'kWh',
      }],
    });

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

    expect(await service.findByKey('power-meter')).toEqual({
      key: 'power-meter',
      name: 'Power',
      type: SensorType.POWER_METER,
      updated: timestamp,
      tags: [
        { key: 'building', value: 'main' },
      ],
      measurements: [{
        key: 'consumption',
        name: 'Consumption',
        unit: 'Wh',
        value: 342.32,
      }, {
        key: 'totalizer',
        name: 'Totalizer',
        unit: 'kWh',
        value: 123456.78,
      }],
    });

    expect(influxDBService.storePoint).toHaveBeenCalledWith(
      'power-meter',
      timestamp,
      { building: 'main', sensorKey: 'power-meter' },
      { consumption: 342.32, totalizer: 123456.78 },
    );
  });

  it('should not crash if no sensor is configured', async () => {
    jest.spyOn(ConfigService.prototype, 'get').mockReturnValue(undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorsService,
        ConfigService,
        { provide: 'PUB_SUB', useValue: { publish: jest.fn() } },
        { provide: InfluxDBService, useValue: influxDBService },
      ],
    }).compile();

    expect(() => module.get<SensorsService>(SensorsService)).not.toThrow();
  });
});
