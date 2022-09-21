import { resolve } from 'path';
import * as request from 'supertest';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import SensorsController from './sensors.controller';
import SensorsService from './sensors.service';

describe('SensorsController', () => {
  let app: INestApplication;
  let controller: SensorsController;

  beforeEach(async () => {
    const config = yaml.load(readFileSync(resolve(__dirname, '__fixtures__', 'sensors.yaml'), 'utf8'));
    jest.spyOn(ConfigService.prototype, 'get').mockReturnValue(config.sensors);
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
