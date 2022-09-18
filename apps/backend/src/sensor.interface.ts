import SensorType from './sensor-type.enum';

export interface Sensor {
  key: string
  name: string
  type: SensorType
}
