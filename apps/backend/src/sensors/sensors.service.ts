import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs-extra';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import Sensor from './sensor.interface';
import MeasurementsArrivedEvent from '../measurements/measurements.arrived.event';

@Injectable()
class SensorsService {
  sensors: Sensor[] = [];

  constructor(private configService: ConfigService) {
    const sensorsConfigFile = resolve(this.configService.get('configurationDirectory'), 'sensors.config.js');
    if (existsSync(sensorsConfigFile)) {
      // eslint-disable-next-line no-eval
      const sensorsConfig = eval(readFileSync(sensorsConfigFile).toString())();
      this.sensors = sensorsConfig.sensors;
    }
  }

  async findAll(): Promise<Sensor[]> {
    return Promise.resolve(this.sensors);
  }

  async findByKey(key: string): Promise<Sensor> {
    return Promise.resolve(this.sensors.find((sensor) => sensor.key === key));
  }

  @OnEvent(MeasurementsArrivedEvent.KEY, { async: true })
  async handleMeasurementsArrivedEvent(event: MeasurementsArrivedEvent) {
    const sensor = await this.findByKey(event.sensorKey);
    if (sensor && sensor.measurements) {
      Object.keys(sensor.measurements).forEach((key) => {
        sensor.measurements[key].value = event.measurements[key];
      });
    }
  }
}

export default SensorsService;
