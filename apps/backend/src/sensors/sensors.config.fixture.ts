import { SensorType } from '@skynjari/data-model';

const config = {
  sensors: [
    {
      key: 'power-meter',
      name: 'Power',
      type: SensorType.PowerMeter,
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
      key: 'thermo-meter-living',
      name: 'Thermometer Living',
      type: SensorType.ThermoMeter,
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
  ],
};

export default config;
