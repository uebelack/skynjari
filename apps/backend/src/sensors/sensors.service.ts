import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Sensor, MeasurementsArrivedEvent } from '@skynjari/interfaces';

@Injectable()
class SensorsService {
  sensors: Sensor[] = [];

  constructor(private configService: ConfigService) {
    this.sensors = this.configService.get('sensors') || [];
  }

  async findAll(): Promise<Sensor[]> {
    return Promise.resolve(this.sensors);
  }

  async findByKey(key: string): Promise<Sensor> {
    return Promise.resolve(this.sensors.find((sensor) => sensor.key === key));
  }

  @OnEvent(MeasurementsArrivedEvent.KEY, { async: true })
  async handleMeasurementsArrivedEvent(event: MeasurementsArrivedEvent) {
    const sensor = await this.findByKey(event.sensorKey);
    if (sensor && sensor.measurements) {
      Object.keys(sensor.measurements).forEach((key) => {
        sensor.measurements[key].value = event.measurements[key];
      });
    }
  }
}

export default SensorsService;
