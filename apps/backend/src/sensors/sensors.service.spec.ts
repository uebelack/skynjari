import { ConfigService } from '@nestjs/config';
import { SensorType, MeasurementsArrivedEvent } from '@skynjari/interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import sensorConfig from './sensors.config.fixture';

import SensorsService from './sensors.service';

describe('SensorsService', () => {
  let service: SensorsService;

  beforeEach(async () => {
    jest.spyOn(ConfigService.prototype, 'get').mockReturnValue(sensorConfig.sensors);
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorsService, ConfigService],
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
      type: SensorType.PowerMeter,
      measurements: {
        consumption: {
          name: 'Consumption',
          unit: 'Wh',
        },
        totalizer: {
          name: 'Totalizer',
          unit: 'kWh',
        },
      },
    });
    const event = new MeasurementsArrivedEvent(
      'power-meter',
      {
        consumption: 342.32,
        totalizer: 123456.78,
      },
    );

    await service.handleMeasurementsArrivedEvent(event);

    expect(await service.findByKey('power-meter')).toEqual({
      key: 'power-meter',
      name: 'Power',
      type: SensorType.PowerMeter,
      measurements: {
        consumption: {
          name: 'Consumption',
          unit: 'Wh',
          value: 342.32,
        },
        totalizer: {
          name: 'Totalizer',
          unit: 'kWh',
          value: 123456.78,
        },
      },
    });
  });

  it('should not crash if no sensor is configured', async () => {
    jest.spyOn(ConfigService.prototype, 'get').mockReturnValue(undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorsService, ConfigService],
    }).compile();

    expect(() => module.get<SensorsService>(SensorsService)).not.toThrow();
  });
});
