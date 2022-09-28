import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementsArrivedEvent } from '@skynjari/data-model';
import AppGateway from './app.gateway';

describe('AppGateway', () => {
  let gateway: AppGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppGateway],
    }).compile();

    gateway = module.get<AppGateway>(AppGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should emit measurement arrived events', () => {
    gateway.server = {
      emit: jest.fn(),
    };
    const timestamp = new Date();
    const event = new MeasurementsArrivedEvent('test', timestamp, { test: 123.33 });
    gateway.handleMeasurementsArrivedEvent(event);
    expect(gateway.server.emit).toHaveBeenCalledWith('measurements', JSON.stringify({ sensorKey: 'test', timestamp, measurements: { test: 123.33 } }));
  });
});
