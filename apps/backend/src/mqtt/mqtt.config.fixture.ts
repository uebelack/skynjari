const config = {
  brokers: [
    {
      url: 'mqtt://192.168.0.210/1883',
      inboundTopic: 'skynjari/inbound/#',
    },
  ],
};

export default config;
