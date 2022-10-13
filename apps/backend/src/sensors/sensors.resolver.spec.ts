import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import SensorsResolver from './sensors.resolver';
import SensorsService from './sensors.service';
import Sensor from './sensor.type';

describe('SensorsResolver', () => {
  let resolver: SensorsResolver;
  const sensorService = { findByKey: jest.fn(), findAll: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorsResolver,
        SensorsService,
        { provide: SensorsService, useValue: sensorService },
        ConfigService,
        { provide: 'PUB_SUB', useValue: { publish: jest.fn(), asyncIterator: () => 'TEST' } },
      ],
    }).compile();

    resolver = module.get<SensorsResolver>(SensorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return sensor for key', async () => {
    const expectedSensor = new Sensor();
    sensorService.findByKey.mockReturnValue(Promise.resolve(expectedSensor));
    const sensor = await resolver.sensor('power-meter');
    expect(sensor).toEqual(expectedSensor);
  });

  it('should throuw if sensor cant be found', async () => {
    sensorService.findByKey.mockReturnValue(Promise.resolve(null));
    await expect(async () => resolver.sensor('power-meter')).rejects.toThrow(NotFoundException);
  });

  it('should return all sensors', async () => {
    const expectedSensors = [new Sensor()];
    sensorService.findAll.mockReturnValue(Promise.resolve(expectedSensors));
    const sensors = await resolver.sensors();
    expect(sensors).toEqual(expectedSensors);
  });

  it('should return result for sensorUpdated', async () => {
    expect(resolver.sensorUpdated()).toEqual('TEST');
  });
});
