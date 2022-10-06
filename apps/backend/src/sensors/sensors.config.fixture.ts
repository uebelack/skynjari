import { SensorType } from '@skynjari/data-model';

const config = {
  sensors: [
    {
      key: 'power-meter',
      name: 'Power',
      type: SensorType.POWER_METER,
      measurements: [{
        key: 'consumption',
        name: 'Consumption',
        unit: 'Wh',
      }, {
        key: 'totalizer',
        name: 'Totalizer',
        unit: 'kWh',
      }],
    },
    {
      key: 'water-meter',
      name: 'Water',
      type: SensorType.WATER_METER,
      measurements: [{
        key: 'consumption',
        name: 'Consumption',
        unit: 'L',
      }, {
        key: 'totalizer',
        name: 'Totalizer',
        unit: 'L',
      }],
    },
    {
      key: 'thermometer-living',
      name: 'Thermometer Living',
      type: SensorType.THERMOMETER,
      measurements: [{
        key: 'temperature',
        name: 'Temperature',
        unit: '°C',
      }, {
        key: 'humidity',
        name: 'Humidity',
        unit: '%',
      }, {
        key: 'pressure',
        name: 'Pressure',
        unit: 'hPa',
      }],
    },
  ],
};

export default config;
