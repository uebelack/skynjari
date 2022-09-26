import { Component, Input } from '@angular/core';
import { Sensor } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list-item',
  templateUrl: './sensors-list-item.component.html',
  styleUrls: ['./sensors-list-item.component.scss'],
})
class SensorsListItemComponent {
  @Input() sensor!: Sensor;
}

export default SensorsListItemComponent;
