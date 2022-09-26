import { Component, Input } from '@angular/core';
import { Sensor } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list-item-thermo-meter',
  templateUrl: './sensors-list-item-thermo-meter.component.html',
})
class SensorsListItemThermoMeterComponent {
  @Input() sensor!: Sensor;
}

export default SensorsListItemThermoMeterComponent;
