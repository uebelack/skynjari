import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { EventEmitterModule, EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from '@nestjs/common';
import { connect } from 'mqtt';
import MqttService from './mqtt.service';
import MqttModule from './mqtt.module';

jest.mock('mqtt', () => ({ connect: jest.fn() }));

describe('MqttService', () => {
  const configService = {
    get: () => [{
      url: 'mqtt://192.168.0.210/1883',
      inboundTopic: 'skynjari/inbound/#',
    }],
  };

  const eventEmitter = { emit: jest.fn() };
  const client = { on: jest.fn(), subscribe: jest.fn() };

  const createService = async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MqttModule, EventEmitterModule.forRoot()],
    }).overrideProvider(ConfigService)
      .useValue(configService)
      .overrideProvider(EventEmitter2)
      .useValue(eventEmitter)
      .compile();

    return module.get<MqttService>(MqttService);
  };

  it('should subscribe to topic and log info', async () => {
    const logSpy = jest.spyOn(Logger.prototype, 'log');

    (connect as jest.Mock).mockImplementation(() => client);
    client.on.mockImplementation((event, callback) => { if (event === 'connect') { callback(); } });
    client.subscribe.mockImplementation((topic, callback) => { callback(); });

    await createService();

    expect(client.subscribe.mock.calls[0][0]).toEqual('skynjari/inbound/#');
    expect(logSpy).toBeCalledWith('Connecting to mqtt://192.168.0.210/1883...');
    expect(logSpy).toBeCalledWith('Connected to mqtt://192.168.0.210/1883 😀');
  });

  it('should subscribe to topic and log error', async () => {
    const logSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation(() => true);

    (connect as jest.Mock).mockImplementation(() => client);
    client.on.mockImplementation((event, callback) => { if (event === 'connect') { callback(); } });
    client.subscribe.mockImplementation((topic, callback) => { callback('connection failed'); });

    await createService();

    expect(client.subscribe.mock.calls[0][0]).toEqual('skynjari/inbound/#');
    expect(logSpy).toBeCalledWith('connection failed');
  });

  it('should emit new measurements as events', async () => {
    (connect as jest.Mock).mockImplementation(() => client);
    const payload = JSON.stringify({
      consumption: 1323.3,
      totalizer: 23432.32,
    });
    client.on.mockImplementation((event, callback) => { if (event === 'message') { callback('skynjari/inbound/power_meter', payload); } });
    await createService();
    expect(eventEmitter.emit).toBeCalledWith('measurements.arrived', {
      sensorKey: 'power_meter',
      measurements: {
        consumption: 1323.3,
        totalizer: 23432.32,
      },
    });
  });
});
