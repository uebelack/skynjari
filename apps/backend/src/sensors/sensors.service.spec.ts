import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import SensorsService from './sensors.service';
import Sensor from './sensor.interface';
import SensorType from './sensor-type.enum';
import MeasurementsArrivedEvent from '../measurements/measurements.arrived.event';

describe('SensorsService', () => {
  let service: SensorsService;
  let sensors: Sensor[];

  beforeEach(async () => {
    sensors = [
      {
        key: 'abc', name: undefined, type: undefined, measurements: undefined,
      },
      {
        key: 'def', name: undefined, type: undefined, measurements: undefined,
      },
      {
        key: 'ghi',
        name: 'Test Power Meter',
        type: SensorType.PowerMeter,
        measurements: {
          consumption: {
            name: 'Consumption',
            unit: 'Wh',
            value: undefined,
          },
          totalizer: {
            name: 'Totalizer',
            unit: 'kWh',
            value: undefined,
          },
        },
      },
    ];

    const configService = {
      get: () => sensors,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorsService, ConfigService],
    }).overrideProvider(ConfigService)
      .useValue(configService)
      .compile();

    service = module.get<SensorsService>(SensorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all sensors', async () => {
    expect(await service.findAll()).toEqual(sensors);
  });

  it('should return sensor for key', async () => {
    expect(await service.findByKey('def')).toEqual(sensors[1]);
  });

  it('should update measurements on sensors', async () => {
    expect(await service.findByKey('ghi')).toEqual({
      key: 'ghi',
      name: 'Test Power Meter',
      type: SensorType.PowerMeter,
      measurements: {
        consumption: {
          name: 'Consumption',
          unit: 'Wh',
          value: undefined,
        },
        totalizer: {
          name: 'Totalizer',
          unit: 'kWh',
          value: undefined,
        },
      },
    });
    const event = new MeasurementsArrivedEvent();
    event.sensorKey = 'ghi';
    event.measurements = {
      consumption: 342.32,
      totalizer: 123456.78,
    };

    await service.handleMeasurementsArrivedEvent(event);

    expect(await service.findByKey('ghi')).toEqual({
      key: 'ghi',
      name: 'Test Power Meter',
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
});
