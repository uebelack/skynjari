import MqttModule from './mqtt.module';

describe('MqttModule', () => {
  it('should initialize', () => {
    expect(() => new MqttModule()).not.toThrow();
  });
});
