import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import sensors from './sensors.fixture';

import SensorsService from './sensors.service';

describe('SensorsService', () => {
  let httpTestingController: HttpTestingController;
  let service: SensorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SensorsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return all sensors', () => {
    service.getSensors().subscribe((data) => {
      expect(data).toEqual(sensors);
    });
    httpTestingController.expectOne('/api/v1/sensors').flush(sensors);
  });
});
