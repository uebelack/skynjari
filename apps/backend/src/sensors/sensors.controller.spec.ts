import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import SensorsController from './sensors.controller';
import SensorsService from './sensors.service';
import sensorConfig from './sensors.config.fixture';

describe('SensorsController', () => {
  let app: INestApplication;
  let controller: SensorsController;

  beforeEach(async () => {
    jest.spyOn(ConfigService.prototype, 'get').mockReturnValue(sensorConfig.sensors);
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorsService, ConfigService],
      controllers: [SensorsController],
    }).compile();

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
    .expect([{
      key: 'power-meter',
      name: 'Power',
      type: 'power-meter',
      measurements: {
        consumption: { name: 'Consumption', unit: 'Wh' },
        totalizer: { name: 'Totalizer', unit: 'kWh' },
      },
    }, {
      key: 'water-meter',
      name: 'Water',
      type: 'water-meter',
      measurements: {
        consumption: { name: 'Consumption', unit: 'L' },
        totalizer: { name: 'Totalizer', unit: 'L' },
      },
    }, {
      key: 'thermometer-living',
      name: 'Thermometer Living',
      type: 'thermometer',
      measurements: {
        temperature: { name: 'Temperature', unit: '°C' },
        humidity: { name: 'Humidity', unit: '%' },
        pressure: { name: 'Pressure', unit: 'hPa' },
      },
    }]));
});
