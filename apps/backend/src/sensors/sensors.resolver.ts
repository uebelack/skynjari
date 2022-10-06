/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException, Inject } from '@nestjs/common';
import {
  Args, Query, Resolver, Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import Sensor from './sensor.type';
import SensorService from './sensors.service';

@Resolver(of => Sensor)
class SensorsResolver {
  constructor(private readonly sensorsService: SensorService, @Inject('PUB_SUB') private readonly pubSub: PubSub) {}

  @Query(/* istanbul ignore next */ returns => Sensor)
  async sensor(@Args('key') key: string): Promise<Sensor> {
    const sensor = await this.sensorsService.findByKey(key);
    if (!sensor) {
      throw new NotFoundException(key);
    }
    return sensor;
  }

  @Query(/* istanbul ignore next */returns => [Sensor])
  sensors(): Promise<Sensor[]> {
    return this.sensorsService.findAll();
  }

  @Subscription(/* istanbul ignore next */ returns => Sensor)
  sensorUpdated() {
    const result = this.pubSub.asyncIterator('sensorUpdated');
    return result;
  }
}

export default SensorsResolver;
