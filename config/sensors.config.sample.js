const config = {
  sensors: [
    {
      key: 'power-meter',
      name: 'Power',
      type: 'power-meter',
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
      type: 'water-meter',
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
      type: 'thermometer',
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
  ]
};

module.exports = () => config;