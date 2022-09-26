import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { OnEvent } from '@nestjs/event-emitter';

import { MeasurementsArrivedEvent } from '@skynjari/interfaces';

@WebSocketGateway({ cors: true })
class AppGateway {
  @WebSocketServer() server;

  @OnEvent(MeasurementsArrivedEvent.KEY, { async: true })
  handleMeasurementsArrivedEvent(event: MeasurementsArrivedEvent) {
    this.server.emit('measurements', JSON.stringify(event));
  }
}

export default AppGateway;
