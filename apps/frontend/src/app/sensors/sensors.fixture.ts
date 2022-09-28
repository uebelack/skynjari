import { Sensor, SensorType } from '@skynjari/data-model';

const sensors: Sensor[] = [
  {
    key: 'power-meter',
    name: 'Power',
    type: SensorType.PowerMeter,
    updated: new Date('2021-01-01T00:00:00.000Z'),
    measurements: {
      consumption: {
        name: 'Consumption',
        unit: 'Wh',
      },
      totalizer: {
        name: 'Totalizer',
        unit: 'kWh',
      },
    },
  },
  {
    key: 'water-meter',
    name: 'Water',
    type: SensorType.WaterMeter,
    updated: new Date('2021-01-01T00:00:00.000Z'),
    measurements: {
      consumption: {
        name: 'Consumption',
        unit: 'L',
      },
      totalizer: {
        name: 'Totalizer',
        unit: 'L',
      },
    },
  },
  {
    key: 'thermometer-living',
    name: 'Thermometer Living',
    type: SensorType.Thermometer,
    measurements: {
      temperature: {
        name: 'Temperature',
        unit: '°C',
      },
      humidity: {
        name: 'Humidity',
        unit: '%',
      },
      pressure: {
        name: 'Pressure',
        unit: 'hPa',
      },
    },
  },
];

export default sensors;
