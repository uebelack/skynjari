import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorType } from '@skynjari/data-model';
import SensorsListItemThermoMeterComponent from './sensors-list-item-thermo-meter.component';

describe('SensorsListItemThermoMeterComponent', () => {
  let component: SensorsListItemThermoMeterComponent;
  let fixture: ComponentFixture<SensorsListItemThermoMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorsListItemThermoMeterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorsListItemThermoMeterComponent);
    component = fixture.componentInstance;
    component.sensor = {
      name: 'Test',
      key: 'test',
      type: SensorType.PowerMeter,
      measurements: {
        temperature: { name: 'Temperature', unit: '°C' },
        humidity: { name: 'Humidity', unit: '%' },
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
