import { Component, Input } from '@angular/core';
import { Sensor, Measurement } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list-item-water-meter',
  templateUrl: './sensors-list-item-water-meter.component.html',
})
class SensorsListItemWaterMeterComponent {
  @Input() sensor!: Sensor;

  get total() : Measurement | undefined {
    return this.sensor.measurements.find((measurement) => measurement.key === 'total_today');
  }

  get hot_total() : Measurement | undefined {
    return this.sensor.measurements.find((measurement) => measurement.key === 'hot_today');
  }

  get cold_total() : Measurement | undefined {
    return this.sensor.measurements.find((measurement) => measurement.key === 'cold_today');
  }
}

export default SensorsListItemWaterMeterComponent;
