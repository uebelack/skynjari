import { Component, Input } from '@angular/core';
import { Sensor } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list-item-thermometer',
  templateUrl: './sensors-list-item-thermometer.component.html',
})
class SensorsListItemThermometerComponent {
  @Input() sensor!: Sensor;
}

export default SensorsListItemThermometerComponent;
