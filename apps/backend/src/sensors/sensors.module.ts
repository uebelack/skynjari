import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import sensorsConfig from './sensors.config';
import SensorsController from './sensors.controller';
import SensorsService from './sensors.service';

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
