class MeasurementsArrivedEvent {
  public static KEY: string = 'measurements.arrived';

  sensorKey: string;

  measurements: Record<string, number>;
}

export default MeasurementsArrivedEvent;
