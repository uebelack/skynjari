import SensorType from './sensor-type.enum';
import Measurement from './measurement.interface';

interface Sensor {
  key: string
  name: string
  type: SensorType
  updated?: Date
  measurements: Measurement[]
}

export default Sensor;
