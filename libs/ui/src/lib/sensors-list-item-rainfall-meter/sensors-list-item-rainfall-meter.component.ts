import { Component, Input } from '@angular/core';
import { Sensor, Measurement } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list-item-rainfall-meter',
  templateUrl: './sensors-list-item-rainfall-meter.component.html',
})
class SensorsListItemRainfallMeterComponent {
  @Input() sensor!: Sensor;

  get rain() : Measurement | undefined {
    return this.sensor.measurements.find((measurement) => measurement.key === 'rain');
  }

  get rain24() : Measurement | undefined {
    return this.sensor.measurements.find((measurement) => measurement.key === 'rain_24');
  }
}

export default SensorsListItemRainfallMeterComponent;
