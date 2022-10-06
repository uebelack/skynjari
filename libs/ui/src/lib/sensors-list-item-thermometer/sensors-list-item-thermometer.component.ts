import { Component, Input } from '@angular/core';
import { Sensor, Measurement } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list-item-thermometer',
  templateUrl: './sensors-list-item-thermometer.component.html',
})
class SensorsListItemThermometerComponent {
  @Input() sensor!: Sensor;

  get humidity() : Measurement | undefined {
    return this.sensor.measurements.find((measurement) => measurement.key === 'humidity');
  }

  get temperature() : Measurement | undefined {
    return this.sensor.measurements.find((measurement) => measurement.key === 'temperature');
  }
}

export default SensorsListItemThermometerComponent;
