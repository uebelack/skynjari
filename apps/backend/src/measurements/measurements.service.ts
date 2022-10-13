/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
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

  async loadLatestMeasurements(sensor: Sensor, measurementIndex = 0) {
    const query = `from(bucket: "${this.influxDBService.bucket()}")
      |> range(start: -1h)
      |> filter(fn: (r) => r._measurement == "${sensor.type}" and r.sensorKey == "${sensor.key}" and r._field == "${sensor.measurements[measurementIndex].key}")
      |> last()`;

    const result = await this.influxDBService.queryApi().collectRows(query);
    if (result.length > 0) {
      const measurement = (result[0] as { _value: number, _time: string });
      sensor.measurements[measurementIndex].value = measurement._value;
      sensor.updated = new Date(measurement._time);
    }
    if (measurementIndex + 1 < sensor.measurements.length) {
      await this.loadLatestMeasurements(sensor, measurementIndex + 1);
    }
  }
}

export default MeasurementsService;
