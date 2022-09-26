import sensorsReducer from './sensors.reducer';
import sensorsAction from './sensors.actions';
import sensors from './sensors.fixture';

describe('SensorReducer', () => {
  it('should return new state', () => {
    expect(sensorsReducer([], sensorsAction({ sensors }))).toEqual(sensors);
  });
});
