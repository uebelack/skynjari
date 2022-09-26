import selectSensors from './sensors.selector';

describe('SensorsSelector', () => {
  it('should selectSensors', () => {
    expect(selectSensors({ sensors: [] })).toEqual([]);
  });
});
