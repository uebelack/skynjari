import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorType, Measurement } from '@skynjari/data-model';
import SensorsListItemThermometerComponent from './sensors-list-item-thermometer.component';

describe('SensorsListItemThermometerComponent', () => {
  let component: SensorsListItemThermometerComponent;
  let fixture: ComponentFixture<SensorsListItemThermometerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorsListItemThermometerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorsListItemThermometerComponent);
    component = fixture.componentInstance;
    component.sensor = {
      name: 'Test',
      key: 'test',
      type: SensorType.POWER_METER,
      measurements: [
        { key: 'temperature', name: 'Temperature', unit: '°C' } as Measurement,
        { key: 'humidity', name: 'Humidity', unit: '%' } as Measurement,
      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
