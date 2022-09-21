import * as fs from 'fs';
import sensorsConfig from './sensors.config';

describe('SensorsConfig', () => {
  it('should return empty object', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(sensorsConfig()).toEqual({});
  });

  it('should return config', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readFileSync').mockReturnValue('sensors:\n  - key: power-meter\n');
    expect(sensorsConfig()).toEqual({
      sensors: [
        { key: 'power-meter' },
      ],
    });
  });
});
