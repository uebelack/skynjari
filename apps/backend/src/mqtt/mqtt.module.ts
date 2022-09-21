import { Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import MqttService from './mqtt.service';

@Module({
  providers: [MqttService, ConfigService],
})
class MqttModule {}

export default MqttModule;
