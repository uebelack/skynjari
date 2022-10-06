import {
  Component, OnInit, OnDestroy, Input,
} from '@angular/core';
import { Sensor, SensorType } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list-item',
  templateUrl: './sensors-list-item.component.html',
})
class SensorsListItemComponent implements OnInit, OnDestroy {
  @Input() sensor!: Sensor;

  readonly SensorType = SensorType;

  updated?: Date;

  interval?: any;

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.updated = this.sensor?.updated ? new Date(this.sensor.updated) : undefined;
    this.interval = setInterval(() => {
      this.updated = this.sensor?.updated ? new Date(this.sensor.updated) : undefined;
    }, 1000);
  }
}

export default SensorsListItemComponent;
