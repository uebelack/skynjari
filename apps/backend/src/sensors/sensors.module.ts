import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import MeasurementsModule from '../measurements/measurements.module';
import sensorsConfig from './sensors.config';
import SensorsService from './sensors.service';
import SensorsResolver from './sensors.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [sensorsConfig],
    }),
    MeasurementsModule,
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    SensorsService,
    ConfigService,
    SensorsResolver,
  ],
})
class SensorsModule {}

export default SensorsModule;
