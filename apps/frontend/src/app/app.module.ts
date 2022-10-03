import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularPageVisibilityModule } from 'angular-page-visibility';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { UiModule } from '@skynjari/ui';
import { ServiceWorkerModule } from '@angular/service-worker';
import AppComponent from './app.component';
import sensorsReducer from './sensors/sensors.reducer';
import SensorsService from './sensors/sensors.service';
import LocaleService from './locale.service';
import environment from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularPageVisibilityModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ sensors: sensorsReducer }),
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    UiModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [SensorsService, { provide: LOCALE_ID, useValue: LocaleService.locale() }],
  bootstrap: [AppComponent],
})
class AppModule {}

export default AppModule;
