import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorType, Measurement } from '@skynjari/data-model';
import SensorsListItemWaterMeterComponent from './sensors-list-item-heating-meter.component';

describe('SensorsListItemWaterMeterComponent', () => {
  let component: SensorsListItemWaterMeterComponent;
  let fixture: ComponentFixture<SensorsListItemWaterMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorsListItemWaterMeterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorsListItemWaterMeterComponent);
    component = fixture.componentInstance;
    component.sensor = {
      name: 'Test',
      key: 'test',
      type: SensorType.POWER_METER,
      measurements: [
        {
          key: 'total_today', name: 'Total Today', unit: 'L', value: 100,
        } as Measurement,
      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
