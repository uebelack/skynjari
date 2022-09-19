import { Module } from '@nestjs/common';

import AppController from './app.controller';
import AppService from './app.service';

import SensorModule from '../sensors/sensors.module';
import MqttModule from '../mqtt/mqtt.module';

@Module({
  imports: [
    SensorModule,
    MqttModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
class AppModule {}

export default AppModule;
