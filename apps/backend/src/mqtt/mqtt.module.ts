import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import MqttService from './mqtt.service';
import mqttConfig from './mqtt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mqttConfig],
    }),
  ],
  providers: [MqttService, ConfigService],
})
class MqttModule {}

export default MqttModule;
