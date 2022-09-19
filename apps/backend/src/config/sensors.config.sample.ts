const sensors = [
  {
    key: 'power-meter',
    name: 'Power',
    type: 'power-meter',
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
    type: 'water-meter',
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
    type: 'thermometer',
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
];

export default () => ({ sensors });
