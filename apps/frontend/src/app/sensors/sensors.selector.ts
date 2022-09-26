import { createFeatureSelector } from '@ngrx/store';
import { Sensor } from '@skynjari/interfaces';

const selectSensors = createFeatureSelector<ReadonlyArray<Sensor>>('sensors');

export default selectSensors;
