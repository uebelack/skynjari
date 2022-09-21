import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import configuration from '../configuration';

import AppController from './app.controller';
import AppService from './app.service';

import SensorModule from '../sensors/sensors.module';
import MqttModule from '../mqtt/mqtt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
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
