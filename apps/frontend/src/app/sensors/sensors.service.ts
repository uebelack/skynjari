import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Sensor } from '@skynjari/data-model';
import { Apollo, gql } from 'apollo-angular';
import sensorsUpdated from './sensors.actions';
import selectSensors from './sensors.selector';

@Injectable({
  providedIn: 'root',
})
class SensorsService {
  sensors: readonly Sensor[] = [];

  constructor(private apollo: Apollo, private store: Store) {}

  init() {
    this.store.select(selectSensors).subscribe((sensors) => {
      this.sensors = sensors;
    });
    this.refresh();
  }

  refresh() {
    this.apollo.watchQuery({
      fetchPolicy: 'cache-and-network',
      query: gql`
        {
          sensors {
            key
            name
            type
            updated
            measurements {
              key
              name
              unit
              value
            }
          }
        }
      `,
    }).valueChanges.pipe(map((result) => {
      if (result.data) {
        return (result.data as { sensors: Sensor[] }).sensors.map((sensor) => ({
          ...sensor,
          updated: sensor.updated && new Date(sensor.updated),
        }));
      }
      return [];
    })).subscribe((sensors) => {
      this.store.dispatch(sensorsUpdated({ sensors }));
    });

    this.apollo.subscribe({
      query: gql`
      subscription OnSensorUpdated {
        sensorUpdated {
          key
          name
          type
          updated
          measurements {
            key
            name
            unit
            value
          }
        }
      }
      `,
    }).pipe(map((result) => {
      if (result.data) {
        const sensor = (result.data as { sensorUpdated: Sensor }).sensorUpdated;
        return {
          ...sensor,
          updated: sensor.updated && new Date(sensor.updated),
        };
      }
      return null;
    })).subscribe((sensor) => {
      if (sensor) {
        const sensors = this.sensors.map((s) => {
          if (s.key === sensor.key) {
            return sensor;
          }
          return s;
        });
        this.store.dispatch(sensorsUpdated({ sensors }));
      }
    });
  }
}

export default SensorsService;
