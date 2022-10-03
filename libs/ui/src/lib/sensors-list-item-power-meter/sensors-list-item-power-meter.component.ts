import { Component, Input } from '@angular/core';
import { Sensor } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list-item-power-meter',
  templateUrl: './sensors-list-item-power-meter.component.html',
})
class SensorsListItemPowerMeterComponent {
  @Input() sensor!: Sensor;

  consumption() {
    return this.sensor.measurements.find((measurement) => measurement.key === 'consumption');
  }
}

export default SensorsListItemPowerMeterComponent;
