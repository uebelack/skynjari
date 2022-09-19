import { IClientOptions } from 'mqtt';

interface Mqtt {
  url: string
  options: IClientOptions
  inboundTopic: string
}

export default Mqtt;
