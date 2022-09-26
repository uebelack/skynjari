import { createAction, props } from '@ngrx/store';
import { Sensor } from '@skynjari/interfaces';

const sensorsUpdated = createAction('[Sensors] updated', props<{ sensors: ReadonlyArray<Sensor> }>());

export default sensorsUpdated;
