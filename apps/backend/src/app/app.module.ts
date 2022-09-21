import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import AppController from './app.controller';
import AppService from './app.service';

import SensorModule from '../sensors/sensors.module';
import MqttModule from '../mqtt/mqtt.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    SensorModule,
    MqttModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
class AppModule {}

export default AppModule;
