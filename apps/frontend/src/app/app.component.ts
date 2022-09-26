import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import SensorsService from './sensors/sensors.service';
import sensorsRetrieved from './sensors/sensors.actions';
import selectSensors from './sensors/sensors.selector';

@Component({
  selector: 'skynjari-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
class AppComponent implements OnInit {
  sensors$ = this.store.select(selectSensors);

  constructor(private sensorsService: SensorsService, private store: Store) {}

  ngOnInit() {
    this.sensorsService
      .getSensors()
      .subscribe((sensors) => this.store.dispatch(sensorsRetrieved({ sensors })));
  }
}

export default AppComponent;
