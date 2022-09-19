import { Module } from '@nestjs/common';
import SensorModule from '../sensors/sensors.module';

import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    SensorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
class AppModule {}

export default AppModule;
