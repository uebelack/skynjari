import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sensor } from '@skynjari/interfaces';

@Component({
  selector: 'skynjari-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss'],
})
class SensorListComponent implements OnInit {
  sensors: Sensor[] = [];

  constructor(private http: HttpClient) {}

  fetch() {
    this.http.get<Sensor[]>('/api/v1/sensors')
      .subscribe((t) => {
        this.sensors = t;
      });
  }

  ngOnInit(): void {
    this.fetch();
  }
}

export default SensorListComponent;
