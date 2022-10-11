import * as fs from 'fs';
import influxdbConfig from './influxdb.config';

describe('SensorsConfig', () => {
  it('should return default config', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(influxdbConfig()).toEqual({
      influxdb: {
        token: 'skynjari',
        org: 'skynjari',
        bucket: 'skynjari',
        url: 'http://localhost:8086',
      },
    });
  });

  it('should return config', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readFileSync').mockReturnValue('influxdb:\n  url: http://localhost:8086\n  token: skynjari\n  org: skynjari\n  bucket: skynjari');
    expect(influxdbConfig()).toEqual({
      influxdb: {
        token: 'skynjari',
        org: 'skynjari',
        bucket: 'skynjari',
        url: 'http://localhost:8086',
      },
    });
  });
});
