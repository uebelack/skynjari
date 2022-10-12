class MeasurementsArrivedEvent {
  public static KEY: string = 'measurements.arrived';

  constructor(public sensorKey: string, public timestamp: Date, public measurements: Record<string, number>) {}
}

export default MeasurementsArrivedEvent;
