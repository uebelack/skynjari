import { Component, Input } from '@angular/core';
import { Sensor, Measurement } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list-item-heating-meter',
  templateUrl: './sensors-list-item-heating-meter.component.html',
})
class SensorsListItemHeatingMeterComponent {
  @Input() sensor!: Sensor;

  get forwardTemperature() : Measurement | undefined {
    return this.sensor.measurements.find((measurement) => measurement.key === 'forward_temperature');
  }

  get returnTemperature() : Measurement | undefined {
    return this.sensor.measurements.find((measurement) => measurement.key === 'return_temperature');
  }

  get volumeToday() : Measurement | undefined {
    return this.sensor.measurements.find((measurement) => measurement.key === 'volume_today');
  }

  get energyToday() : Measurement | undefined {
    return this.sensor.measurements.find((measurement) => measurement.key === 'energy_today');
  }
}

export default SensorsListItemHeatingMeterComponent;
