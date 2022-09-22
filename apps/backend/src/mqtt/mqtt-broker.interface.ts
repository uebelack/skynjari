import { IClientOptions } from 'mqtt';

interface MqttBroker {
  url: string
  options: IClientOptions
  inboundTopic: string
}

export default MqttBroker;
