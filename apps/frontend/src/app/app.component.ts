import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OnPageVisible } from 'angular-page-visibility';

import SensorsService from './sensors/sensors.service';
import selectSensors from './sensors/sensors.selector';

@Component({
  selector: 'skynjari-root',
  templateUrl: './app.component.html',
})
class AppComponent implements OnInit {
  sensors$ = this.store.select(selectSensors);

  constructor(private sensorsService: SensorsService, private store: Store) {}

  ngOnInit() {
    this.sensorsService.init();
  }

  @OnPageVisible()
  refresh() {
    this.sensorsService.refresh();
  }
}

export default AppComponent;
