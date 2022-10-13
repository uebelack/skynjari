import { Injectable } from '@nestjs/common';
import { Point } from '@influxdata/influxdb-client';
import { Sensor } from '@skynjari/data-model';
import InfluxDBService from '../influxdb/influxdb.service';

@Injectable()
class MeasurementsService {
  constructor(private influxDBService: InfluxDBService) {}

  async storeMeasurements(sensor: Sensor, timestamp: Date, measurements: Record<string, number>) {
    const point = new Point(sensor.type.toString());
    point.timestamp(timestamp);
    point.tag('sensorKey', sensor.key);
    if (sensor.tags) {
      sensor.tags.forEach((tag) => {
        point.tag(tag.key, tag.value);
      });
    }

    Object.keys(measurements).forEach((key) => {
      point.floatField(key, measurements[key]);
    });

    const writeApi = this.influxDBService.writeApi();
    writeApi.writePoint(point);
    await writeApi.close();
  }
}

export default MeasurementsService;
