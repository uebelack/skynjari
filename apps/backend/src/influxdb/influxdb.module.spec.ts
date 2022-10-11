import InfluxDBModule from './influxdb.module';

describe('InfluxDBModule', () => {
  it('should initialize', () => {
    expect(() => new InfluxDBModule()).not.toThrow();
  });
});
