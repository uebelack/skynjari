import {
  Component, OnInit, OnDestroy, Input,
} from '@angular/core';
import { Sensor } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list-item',
  templateUrl: './sensors-list-item.component.html',
})
class SensorsListItemComponent implements OnInit, OnDestroy {
  @Input() sensor!: Sensor;

  updated?: Date;

  interval?: any;

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
    this.updated = this.sensor?.updated;
    this.interval = setInterval(() => {
      this.updated = this.sensor?.updated;
    }, 1000);
  }
}

export default SensorsListItemComponent;
