import { readFileSync, existsSync } from 'fs';
import * as yaml from 'js-yaml';

const YAML_CONFIG_FILENAME = 'config/mqtt.yaml';

export default () => {
  if (existsSync(YAML_CONFIG_FILENAME)) {
    return yaml.load(readFileSync(YAML_CONFIG_FILENAME, 'utf8'));
  }
  return {};
};
