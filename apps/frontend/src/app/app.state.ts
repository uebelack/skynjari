import { Sensor } from '@skynjari/data-model';

export interface AppState {
  sensors: ReadonlyArray<Sensor>;
}
