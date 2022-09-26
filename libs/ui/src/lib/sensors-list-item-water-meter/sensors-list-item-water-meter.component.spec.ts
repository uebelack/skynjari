import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsListItemWaterMeterComponent } from './sensors-list-item-water-meter.component';

describe('SensorsListItemWaterMeterComponent', () => {
  let component: SensorsListItemWaterMeterComponent;
  let fixture: ComponentFixture<SensorsListItemWaterMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorsListItemWaterMeterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorsListItemWaterMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
