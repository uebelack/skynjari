/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import {
  Args, Query, Resolver,
} from '@nestjs/graphql';
import Sensor from './sensor.type';
import SensorService from './sensors.service';

@Resolver(of => Sensor)
class SensorsResolver {
  constructor(private readonly sensorsService: SensorService) {}

  @Query(returns => Sensor)
  async sensor(@Args('key') key: string): Promise<Sensor> {
    const sensor = await this.sensorsService.findByKey(key);
    if (!sensor) {
      throw new NotFoundException(key);
    }
    return sensor;
  }

  @Query(returns => [Sensor])
  sensors(): Promise<Sensor[]> {
    return this.sensorsService.findAll();
  }
}

export default SensorsResolver;
