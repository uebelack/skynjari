import { Component, Input } from '@angular/core';
import { Sensor } from '@skynjari/interfaces';

@Component({
  selector: 'skynjari-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss'],
})
class SensorListComponent {
  @Input() sensors: ReadonlyArray<Sensor> | null = [];
}

export default SensorListComponent;
