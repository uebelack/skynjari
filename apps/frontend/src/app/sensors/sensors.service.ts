import { Injectable, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
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

    this.refresh(() => {
      this.socket.fromEvent('measurements').subscribe((payload) => {
        const event = JSON.parse(payload as string) as MeasurementsArrivedEvent;
        const nextSensors = JSON.parse(JSON.stringify(this.sensors))
          .map((sensor: Sensor) => ({ ...sensor, updated: sensor.updated && new Date(sensor.updated as unknown as string) })) as Sensor[];
        const sensor = nextSensors.find((s) => s.key === event.sensorKey);
        if (sensor && sensor.measurements) {
          sensor.updated = new Date(event.timestamp);
          Object.keys(sensor.measurements).forEach((key) => {
            sensor.measurements[key].value = event.measurements[key];
          });
        }
        this.store.dispatch(sensorsUpdated({ sensors: nextSensors }));
      });
    });
  }

  refresh(callback: Function | undefined = undefined) {
    this.http.get<Sensor[]>('/api/v1/sensors')
      .pipe(map((sensors) => sensors.map((sensor) => ({ ...sensor, updated: sensor.updated && new Date(sensor.updated) }))))
      .subscribe((sensors) => {
        this.store.dispatch(sensorsUpdated({ sensors }));
        if (callback) {
          callback();
        }
      });
  }

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.refresh();
  }
}

export default SensorsService;
