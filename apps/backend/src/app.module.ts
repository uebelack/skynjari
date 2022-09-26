import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import SensorModule from './sensors/sensors.module';
import MqttModule from './mqtt/mqtt.module';
import AppGateway from './app.gateway';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
    EventEmitterModule.forRoot(),
    SensorModule,
    MqttModule,
    AppGateway,
  ],
})
class AppModule {}

export default AppModule;
