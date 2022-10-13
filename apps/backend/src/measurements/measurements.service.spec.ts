import { Test, TestingModule } from '@nestjs/testing';
import { SensorType } from '@skynjari/data-model';
import { Point } from '@influxdata/influxdb-client';
import InfluxDBService from '../influxdb/influxdb.service';
import MeasurementsService from './measurements.service';

describe('MeasurementsService', () => {
  let service: MeasurementsService;

  const writeApi = { writePoint: jest.fn(), close: jest.fn() };
  const influxDBService = { writeApi: () => writeApi };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeasurementsService,
        { provide: InfluxDBService, useValue: influxDBService },
      ],
    }).compile();

    service = module.get<MeasurementsService>(MeasurementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should store measurements', () => {
    const timestamp = new Date();
    service.storeMeasurements(
      {
        key: 'my-power-meter',
        name: 'My Power Meter',
        type: SensorType.POWER_METER,
        tags: [{ key: 'building', value: 'main' }],
        measurements: [],
      },
      timestamp,
      { consumption: 342.32, totalizer: 123456.78 },
    );

    expect(writeApi.writePoint).toBeCalledWith(
      new Point('power-meter')
        .timestamp(timestamp)
        .tag('sensorKey', 'my-power-meter')
        .tag('building', 'main')
        .floatField('consumption', 342.32)
        .floatField('totalizer', 123456.78),
    );
  });
});
