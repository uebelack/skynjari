import MeasurementsModule from './measurements.module';

describe('MeasurementsModule', () => {
  it('should initialize', () => {
    expect(() => new MeasurementsModule()).not.toThrow();
  });
});
