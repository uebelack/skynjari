import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Get, Controller } from '@nestjs/common';
import { Sensor } from '@skynjari/data-model';

import SensorsService from './sensors.service';

@ApiTags('sensors')
@Controller('sensors')
class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @ApiOperation({ summary: 'Get all sensors' })
  @ApiResponse({ status: 200, description: 'Return all sensors' })
  @Get()
  async findAll(): Promise<Sensor[]> {
    return this.sensorsService.findAll();
  }
}

export default SensorsController;
