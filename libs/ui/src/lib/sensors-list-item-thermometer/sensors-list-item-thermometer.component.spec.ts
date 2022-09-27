import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorType } from '@skynjari/data-model';
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
