import * as fs from 'fs';
import mqttConfig from './mqtt.config';

describe('SensorsConfig', () => {
  it('should return empty object', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(mqttConfig()).toEqual({});
  });

  it('should return config', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readFileSync').mockReturnValue('brokers:\n  - url: mqtt://192.168.0.210/1883\n');
    expect(mqttConfig()).toEqual({
      brokers: [
        { url: 'mqtt://192.168.0.210/1883' },
      ],
    });
  });
});
