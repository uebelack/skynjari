import SensorType from './sensor-type.enum';
import Measurement from '../measurements/measurement.interface';

interface Sensor {
  key: string
  name: string
  type: SensorType
  measurements: Measurement[]
}

export default Sensor;
