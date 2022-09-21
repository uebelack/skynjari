const fs = require('fs-extra');

const configFiles = {
  'apps/backend/src/config/sensors.config.ts': 'apps/backend/src/config/sensors.config.sample.ts',
  'apps/backend/src/config/mqtt.config.ts': 'apps/backend/src/config/sensors.config.default.ts'
};

Object.keys(configFiles).forEach((configFile) => {
  if (!fs.existsSync(configFile)) {
    fs.copySync(configFiles[configFile], configFile);
  }
});
