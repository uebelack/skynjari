import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import Sensor from './sensor.interface';
import SensorsController from './sensors.controller';
import SensorsService from './sensors.service';
import SensorType from './sensor-type.enum';

describe('SensorsController', () => {
  let app: INestApplication;
  let controller: SensorsController;
  let sensors: Sensor[];

  beforeEach(async () => {
    sensors = [
      {
        key: 'ghi',
        name: 'Test Power Meter',
        type: SensorType.PowerMeter,
        measurements: {
          consumption: {
            name: 'Consumption',
            unit: 'Wh',
            value: 2132.23,
          },
          totalizer: {
            name: 'Totalizer',
            unit: 'kWh',
            value: 123.23,
          },
        },
      },
    ];

    const configService = {
      get: () => sensors,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorsService, ConfigService],
      controllers: [SensorsController],
    }).overrideProvider(ConfigService)
      .useValue(configService)
      .compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<SensorsController>(SensorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should /GET sensors', () => request(app.getHttpServer())
    .get('/sensors')
    .expect(200)
    .expect(sensors));
});
