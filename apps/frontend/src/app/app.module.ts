import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import AppComponent from './app.component';
import sensorsReducer from './sensors/sensors.reducer';
import SensorsService from './sensors/sensors.service';
import SensorListComponent from './sensor-list/sensor-list.component';

const config: SocketIoConfig = { url: 'http://localhost:3333', options: {} };

@NgModule({
  declarations: [AppComponent, SensorListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ sensors: sensorsReducer }),
    SocketIoModule.forRoot(config),
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [SensorsService],
  bootstrap: [AppComponent],
})
class AppModule {}

export default AppModule;
