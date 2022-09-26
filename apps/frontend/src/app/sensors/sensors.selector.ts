import { createFeatureSelector } from '@ngrx/store';
import { Sensor } from '@skynjari/data-model';

const selectSensors = createFeatureSelector<ReadonlyArray<Sensor>>('sensors');

export default selectSensors;
