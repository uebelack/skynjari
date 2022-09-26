import SensorsModule from './sensors.module';

describe('SensorsModule', () => {
  it('should initialize', () => {
    expect(() => new SensorsModule()).not.toThrow();
  });
});
