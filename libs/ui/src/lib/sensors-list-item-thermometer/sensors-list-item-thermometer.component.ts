import { Component, Input } from '@angular/core';
import { Sensor } from '@skynjari/data-model';

@Component({
  selector: 'skynjari-sensors-list-item-thermometer',
  templateUrl: './sensors-list-item-thermometer.component.html',
})
class SensorsListItemThermometerComponent {
  @Input() sensor!: Sensor;

  humidity() {
    return this.sensor.measurements.find((measurement) => measurement.key === 'humidity');
  }

  temperature() {
    return this.sensor.measurements.find((measurement) => measurement.key === 'temperature');
  }
}

export default SensorsListItemThermometerComponent;
