import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorType, Measurement } from '@skynjari/data-model';
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
      name: 'Test', key: 'test', type: SensorType.POWER_METER, measurements: [{ key: 'consumption', name: 'Consumption', unit: 'Wh' } as Measurement],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
