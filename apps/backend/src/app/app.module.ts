import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import AppController from './app.controller';
import AppService from './app.service';

import SensorModule from '../sensors/sensors.module';
import MqttModule from '../mqtt/mqtt.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
    EventEmitterModule.forRoot(),
    SensorModule,
    MqttModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
class AppModule {}

export default AppModule;
