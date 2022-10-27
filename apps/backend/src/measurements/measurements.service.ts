/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@nestjs/common';
import { Point } from '@influxdata/influxdb-client';
import { DateTime } from 'luxon';
import Sensor from '../sensors/sensor.type';
import InfluxDBService from '../influxdb/influxdb.service';
import MeasurementConversion from './measurement-conversion.enum';

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
      |> range(start: -30d)
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

  async calculateTransientMeasurements(sensor: Sensor, measurementIndex = 0) {
    const timezone = process.env.TZ || DateTime.local().zoneName;
    const measurement = sensor.measurements[measurementIndex];
    if (measurement.base_measurement && measurement.conversion) {
      if (measurement.conversion === MeasurementConversion.DIFFERENCE_TODAY) {
        const from = DateTime.now().setZone(timezone).startOf('day').toISO();
        const to = DateTime.now().setZone(timezone).endOf('day').toISO();
        const query = `
          last = from(bucket: "${this.influxDBService.bucket()}")
            |> range(start: ${from}, stop: ${to})
            |> filter(fn: (r) => r.sensorKey == "${sensor.key}" and r._field == "${measurement.base_measurement}")
            |> last()

          first = from(bucket: "${this.influxDBService.bucket()}")
            |> range(start: ${from}, stop: ${to})
            |> filter(fn: (r) => r.sensorKey == "${sensor.key}" and r._field == "${measurement.base_measurement}")
            |> first()
          
          union(tables: [first, last])
            |> difference()
        `;

        const result = await this.influxDBService.queryApi().collectRows(query);
        sensor.measurements[measurementIndex].value = 0;
        if (result.length > 0) {
          const row = (result[0] as { _value: number, _time: string });
          const multiplier = measurement.multiplier || 1;
          if (row._value < 0) {
            sensor.measurements[measurementIndex].value = row._value * -1 * multiplier;
          } else {
            sensor.measurements[measurementIndex].value = row._value * multiplier;
          }
        }
      }
    }

    if (measurementIndex + 1 < sensor.measurements.length) {
      await this.calculateTransientMeasurements(sensor, measurementIndex + 1);
    }
  }
}

export default MeasurementsService;
