import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Sensor } from '@skynjari/interfaces';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as yaml from 'js-yaml';
import SensorListComponent from './sensor-list.component';

describe('SensorListComponent', () => {
  let component: SensorListComponent;
  let fixture: ComponentFixture<SensorListComponent>;
  let httpMock: HttpTestingController;
  let sensors: Sensor[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [SensorListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorListComponent);
    sensors = yaml.load(readFileSync(resolve(__dirname, '__fixtures__', 'sensors.yaml'), 'utf8')) as Sensor[];

    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    httpMock.expectOne('/api/v1/sensors').flush(sensors);
    expect(component.sensors).toEqual(sensors);
  });
});
