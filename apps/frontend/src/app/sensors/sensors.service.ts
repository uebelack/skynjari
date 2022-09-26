import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sensor } from '@skynjari/interfaces';

@Injectable({
  providedIn: 'root',
})
class SensorsService {
  constructor(private http: HttpClient) {}

  getSensors(): Observable<Array<Sensor>> {
    return this.http.get<Sensor[]>('/api/v1/sensors');
  }
}

export default SensorsService;
