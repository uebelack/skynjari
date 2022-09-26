import sensorsAction from './sensors.actions';
import sensors from './sensors.fixture';

describe('SensorSctions', () => {
  it('should update sensors', () => {
    expect(sensorsAction({ sensors })).toEqual({ sensors, type: '[Sensors] updated' });
  });
});
