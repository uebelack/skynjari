import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Sensor from './sensor.interface';

@Injectable()
class SensorsService {
  sensors: Sensor[];

  constructor(private configService: ConfigService) {
    this.sensors = configService.get('sensors');
  }

  async findAll(): Promise<Sensor[]> {
    return Promise.resolve(this.sensors);
  }
}

export default SensorsService;
