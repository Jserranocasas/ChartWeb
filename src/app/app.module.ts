/// <reference path="../../node_modules/anychart/dist/index.d.ts"/>

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AccelerometerComponent } from './pages/accelerometer/accelerometer.component';
import { BatteryComponent } from './pages/battery/battery.component';
import { LightComponent } from './pages/light/light.component';
import { GyroscopeComponent } from './pages/gyroscope/gyroscope.component';
import { MagnetometerComponent } from './pages/magnetometer/magnetometer.component';
import { RotationComponent } from './pages/rotation/rotation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccelerometerComponent,
    HomeComponent,
    BatteryComponent,
    LightComponent,
    GyroscopeComponent,
    MagnetometerComponent,
    RotationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
