import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Sensor, MeasurementsArrivedEvent } from '@skynjari/data-model';
import sensorsUpdated from './sensors.actions';
import selectSensors from './sensors.selector';

@Injectable({
  providedIn: 'root',
})
class SensorsService {
  sensors: readonly Sensor[] = [];

  constructor(private http: HttpClient, private socket: Socket, private store: Store) {}

  init() {
    this.store.select(selectSensors).subscribe((sensors) => {
      this.sensors = sensors;
    });

    this.http.get<Sensor[]>('/api/v1/sensors').subscribe((sensors) => {
      this.store.dispatch(sensorsUpdated({ sensors }));
      this.socket.fromEvent('measurements').subscribe((payload) => {
        const event = JSON.parse(payload as string) as MeasurementsArrivedEvent;
        const nextSensors = JSON.parse(JSON.stringify(this.sensors)) as Sensor[];
        const sensor = nextSensors.find((s) => s.key === event.sensorKey);
        if (sensor && sensor.measurements) {
          Object.keys(sensor.measurements).forEach((key) => {
            sensor.measurements[key].value = event.measurements[key];
          });
        }
        this.store.dispatch(sensorsUpdated({ sensors: nextSensors }));
      });
    });
  }
}

export default SensorsService;
