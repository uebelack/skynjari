import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorType } from '@skynjari/data-model';
import SensorsListItemPowerMeterComponent from './sensors-list-item-power-meter.component';

describe('SensorsListItemPowerMeterComponent', () => {
  let component: SensorsListItemPowerMeterComponent;
  let fixture: ComponentFixture<SensorsListItemPowerMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorsListItemPowerMeterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorsListItemPowerMeterComponent);
    component = fixture.componentInstance;
    component.sensor = {
      name: 'Test', key: 'test', type: SensorType.PowerMeter, measurements: { consumption: { name: 'Consumption', unit: 'Wh' } },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
