import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import SensorsController from './sensors.controller';
import SensorsService from './sensors.service';

@Module({
  controllers: [SensorsController],
  providers: [SensorsService, ConfigService],
})
class SensorsModule {}

export default SensorsModule;
