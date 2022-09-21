import { resolve } from 'path';

export default () => ({
  configurationDirectory: process.env.CONFIGURATION_DIRECTORY || resolve('config'),
});
