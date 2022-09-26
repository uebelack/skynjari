import { createAction, props } from '@ngrx/store';
import { Sensor } from '@skynjari/interfaces';

const sensorsRetrieved = createAction('[Sensors] retrieved', props<{ sensors: ReadonlyArray<Sensor> }>());

export default sensorsRetrieved;
