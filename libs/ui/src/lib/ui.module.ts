import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import SensorsListComponent from './sensors-list/sensors-list.component';
import SensorsListItemComponent from './sensors-list-item/sensors-list-item.component';
import { SensorsListItemPowerMeterComponent } from './sensors-list-item-power-meter/sensors-list-item-power-meter.component';
import { SensorsListItemWaterMeterComponent } from './sensors-list-item-water-meter/sensors-list-item-water-meter.component';
import { SensorsListItemThermoMeterComponent } from './sensors-list-item-thermo-meter/sensors-list-item-thermo-meter.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SensorsListComponent,
    SensorsListItemComponent,
    SensorsListItemPowerMeterComponent,
    SensorsListItemWaterMeterComponent,
    SensorsListItemThermoMeterComponent,
  ],
  exports: [
    SensorsListComponent,
    SensorsListItemComponent,
    SensorsListItemPowerMeterComponent,
    SensorsListItemWaterMeterComponent,
    SensorsListItemThermoMeterComponent,
  ],
})
class UiModule {}

export default UiModule;
