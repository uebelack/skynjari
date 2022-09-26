import { createReducer, on } from '@ngrx/store';

import { Sensor } from '@skynjari/interfaces';
import sensorsRetrieved from './sensors.actions';

const initialState: ReadonlyArray<Sensor> = [];

const sensorsReducer = createReducer(
  initialState,
  on(sensorsRetrieved, (state, { sensors }) => sensors),
);

export default sensorsReducer;
