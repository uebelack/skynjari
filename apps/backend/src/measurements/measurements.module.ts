import { Module } from '@nestjs/common';
import MeasurementsService from './measurements.service';
import MeasurementsController from './measurements.controller';

@Module({
  providers: [MeasurementsService],
  controllers: [MeasurementsController],
})
class MeasurementsModule {}

export default MeasurementsModule;
