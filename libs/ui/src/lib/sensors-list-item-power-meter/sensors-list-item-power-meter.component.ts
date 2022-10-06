import { Component, Input } from '@angular/core';
import { Sensor, Measurement } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list-item-power-meter',
  templateUrl: './sensors-list-item-power-meter.component.html',
})
class SensorsListItemPowerMeterComponent {
  @Input() sensor!: Sensor;

  get consumption(): Measurement | undefined {
    return this.sensor.measurements.find((measurement) => measurement.key === 'consumption');
  }
}

export default SensorsListItemPowerMeterComponent;
