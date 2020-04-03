import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccelerometerComponent } from './pages/accelerometer/accelerometer.component';
import { BatteryComponent } from './pages/battery/battery.component';
import { LightComponent } from './pages/light/light.component';
import { GyroscopeComponent } from './pages/gyroscope/gyroscope.component';
import { MagnetometerComponent } from './pages/magnetometer/magnetometer.component';
import { RotationComponent } from './pages/rotation/rotation.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'accelerometer', component: AccelerometerComponent},
  {path: 'battery', component: BatteryComponent},
  {path: 'light', component: LightComponent},
  {path: 'gyroscope', component: GyroscopeComponent},
  {path: 'magnetometer', component: MagnetometerComponent},
  {path: 'rotation', component: RotationComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
