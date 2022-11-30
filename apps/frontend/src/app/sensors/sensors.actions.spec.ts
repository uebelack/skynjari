import sensorsAction from './sensors.actions';
import sensors from './sensors.fixture';

describe('SensorActions', () => {
  it('should update sensors', () => {
    expect(sensorsAction({ sensors })).toEqual({ sensors, type: '[Sensors] updated' });
  });
});
