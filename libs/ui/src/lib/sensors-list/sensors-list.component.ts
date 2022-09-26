import { Component, Input } from '@angular/core';
import { Sensor } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list',
  templateUrl: './sensors-list.component.html',
  styleUrls: ['./sensors-list.component.scss'],
})
class SensorsListComponent {
  @Input() sensors: ReadonlyArray<Sensor> | null = [];
}

export default SensorsListComponent;
