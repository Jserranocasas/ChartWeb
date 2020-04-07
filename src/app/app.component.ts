import { Component } from '@angular/core';
import { AccelerometerService } from './services/accelerometer.service';
import { LightService } from './services/light.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
  ]
})
export class AppComponent {
  title = 'ChartWeb';

  constructor(public measurementsService: AccelerometerService){

  }
}
