import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import sensorsConfig from './sensors.config';
import SensorsController from './sensors.controller';
import SensorsService from './sensors.service';
import SensorsResolver from './sensors.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [sensorsConfig],
    }),
  ],
  controllers: [SensorsController],
  providers: [SensorsService, ConfigService, SensorsResolver],
})
class SensorsModule {}

export default SensorsModule;
