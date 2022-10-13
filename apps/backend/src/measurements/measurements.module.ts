import { Module } from '@nestjs/common';
import MeasurementsService from './measurements.service';
import InfluxDBModule from '../influxdb/influxdb.module';

@Module({
  imports: [
    InfluxDBModule,
  ],
  providers: [MeasurementsService],
  exports: [MeasurementsService],
})
class MeasurementsModule {}

export default MeasurementsModule;
