import { readFileSync, existsSync } from 'fs';
import * as yaml from 'js-yaml';

const YAML_CONFIG_FILENAME = 'config/influxdb.yaml';

export default () => {
  if (existsSync(YAML_CONFIG_FILENAME)) {
    return yaml.load(readFileSync(YAML_CONFIG_FILENAME, 'utf8'));
  }
  return {
    influxdb: {
      url: process.env.INFLUX_DB_URL || 'http://localhost:8086',
      token: process.env.INFLUX_DB_TOKEN || 'skynjari',
      org: process.env.INFLUX_DB_ORG || 'skynjari',
      bucket: process.env.INFLUX_DB_BUCKET || 'skynjari',
    },
  };
};
