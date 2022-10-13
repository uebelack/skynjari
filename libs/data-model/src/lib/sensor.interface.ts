import SensorType from './sensor-type.enum';
import Measurement from './measurement.interface';
import Tag from './tag.interface';

interface Sensor {
  key: string
  name: string
  type: SensorType
  tags?: Tag[]
  updated?: Date
  measurements: Measurement[]
}

export default Sensor;
