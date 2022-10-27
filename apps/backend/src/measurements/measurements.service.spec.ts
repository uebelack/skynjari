import { Test, TestingModule } from '@nestjs/testing';
import { SensorType } from '@skynjari/data-model';
import { Point } from '@influxdata/influxdb-client';
import InfluxDBService from '../influxdb/influxdb.service';
import MeasurementsService from './measurements.service';
import MeasurementConversion from './measurement-conversion.enum';

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

  it('should calculate transient measurements', async () => {
    queryApi.collectRows.mockReturnValue([
      {
        _value: 200, _time: '2014-11-10T23:00:00Z',
      },
    ]);
    const sensor = new Sensor();
    sensor.key = 'my-water-meter';
    sensor.type = SensorType.WATER_METER;
    sensor.measurements = [
      { key: 'total', name: 'Total', unit: 'L' },
      {
        key: 'total_today',
        name: 'Total today',
        unit: 'L',
        base_measurement: 'total',
        conversion: MeasurementConversion.DIFFERENCE_TODAY,
      },
    ];
    await service.calculateTransientMeasurements(sensor);
    expect(sensor.measurements[1].value).toBe(200);
  });

  it('should calculate transient measurements and convert negative values to positive values', async () => {
    queryApi.collectRows.mockReturnValue([
      {
        _value: -2342.22, _time: '2014-11-10T23:00:00Z',
      },
    ]);
    const sensor = new Sensor();
    sensor.key = 'my-water-meter';
    sensor.type = SensorType.WATER_METER;
    sensor.measurements = [
      { key: 'total', name: 'Total', unit: 'L' },
      {
        key: 'total_today',
        name: 'Total today',
        unit: 'L',
        base_measurement: 'total',
        conversion: MeasurementConversion.DIFFERENCE_TODAY,
      },
    ];
    await service.calculateTransientMeasurements(sensor);
    expect(sensor.measurements[1].value).toBe(2342.22);
  });

  it('should calculate transient measurements and apply multiplier', async () => {
    queryApi.collectRows.mockReturnValue([
      {
        _value: 200, _time: '2014-11-10T23:00:00Z',
      },
    ]);
    const sensor = new Sensor();
    sensor.key = 'my-water-meter';
    sensor.type = SensorType.WATER_METER;
    sensor.measurements = [
      { key: 'total', name: 'Total', unit: 'L' },
      {
        key: 'total_today',
        name: 'Total today',
        unit: 'L',
        base_measurement: 'total',
        multiplier: 0.5,
        conversion: MeasurementConversion.DIFFERENCE_TODAY,
      },
    ];
    await service.calculateTransientMeasurements(sensor);
    expect(sensor.measurements[1].value).toBe(100);
  });
});
