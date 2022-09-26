import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { UiModule } from '@skynjari/ui';
import AppComponent from './app.component';
import sensorsReducer from './sensors/sensors.reducer';
import SensorsService from './sensors/sensors.service';

const config: SocketIoConfig = { url: window.location.origin, options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ sensors: sensorsReducer }),
    SocketIoModule.forRoot(config),
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    UiModule,
  ],
  providers: [SensorsService],
  bootstrap: [AppComponent],
})
class AppModule {}

export default AppModule;
