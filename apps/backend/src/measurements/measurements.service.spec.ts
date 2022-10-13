import { Test, TestingModule } from '@nestjs/testing';
import { SensorType } from '@skynjari/data-model';
import { Point } from '@influxdata/influxdb-client';
import InfluxDBService from '../influxdb/influxdb.service';
import MeasurementsService from './measurements.service';

import Sensor from '../sensors/sensor.type';

describe('MeasurementsService', () => {
  let service: MeasurementsService;

  const writeApi = { writePoint: jest.fn(), close: jest.fn() };
  const queryApi = { collectRows: jest.fn() };
  const influxDBService = { writeApi: () => writeApi, bucket: () => 'skynjari-test-bucket', queryApi: () => queryApi };

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

  it('should load latest measurements', async () => {
    queryApi.collectRows.mockReturnValue([
      {
        _value: 100, _time: '2014-11-10T23:00:00Z',
      },
    ]);
    const sensor = new Sensor();
    sensor.key = 'my-power-meter';
    sensor.type = SensorType.POWER_METER;
    sensor.measurements = [
      { key: 'consumption', name: 'Consumption', unit: 'Wh' },
      { key: 'consumption2', name: 'Consumption2', unit: 'Wh' },
    ];
    await service.loadLatestMeasurements(sensor);
    expect(queryApi.collectRows).toBeCalledTimes(2);
  });
});
