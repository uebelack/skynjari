import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import SensorsController from './sensors.controller';
import SensorsService from './sensors.service';
import sensorsConfig from './sensors.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [sensorsConfig],
    }),
  ],
  controllers: [SensorsController],
  providers: [SensorsService, ConfigService],
})
class SensorsModule {}

export default SensorsModule;
