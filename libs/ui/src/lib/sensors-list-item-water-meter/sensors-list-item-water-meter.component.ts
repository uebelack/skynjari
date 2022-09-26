import { Component, Input } from '@angular/core';
import { Sensor } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list-item-water-meter',
  templateUrl: './sensors-list-item-water-meter.component.html',
})
class SensorsListItemWaterMeterComponent {
  @Input() sensor!: Sensor;
}

export default SensorsListItemWaterMeterComponent;
