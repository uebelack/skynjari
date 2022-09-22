import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import AppComponent from './app.component';

import SensorListComponent from './sensor-list/sensor-list.component';

@NgModule({
  declarations: [AppComponent, SensorListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
class AppModule {}

export default AppModule;
