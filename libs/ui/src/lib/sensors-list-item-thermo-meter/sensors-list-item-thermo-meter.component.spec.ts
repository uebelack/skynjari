import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
