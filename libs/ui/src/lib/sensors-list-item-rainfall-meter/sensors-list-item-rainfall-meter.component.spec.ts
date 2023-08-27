import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorType, Measurement } from '@skynjari/data-model';
import SensorsListItemRainfallMeterComponent from './sensors-list-item-rainfall-meter.component';

describe('SensorsListItemRainfallMeterComponent', () => {
  let component: SensorsListItemRainfallMeterComponent;
  let fixture: ComponentFixture<SensorsListItemRainfallMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorsListItemRainfallMeterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorsListItemRainfallMeterComponent);
    component = fixture.componentInstance;
    component.sensor = {
      name: 'Test',
      key: 'test',
      type: SensorType.RAINFALL_METER,
      measurements: [
        { key: 'rain', name: 'Rain', unit: 'l/m²' } as Measurement,
      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
