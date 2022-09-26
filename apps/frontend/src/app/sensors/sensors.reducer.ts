import { createReducer, on } from '@ngrx/store';

import { Sensor } from '@skynjari/data-model';
import sensorsUpdated from './sensors.actions';

const initialState: ReadonlyArray<Sensor> = [];

const sensorsReducer = createReducer(
  initialState,
  on(sensorsUpdated, (state, { sensors }) => sensors),
);

export default sensorsReducer;
