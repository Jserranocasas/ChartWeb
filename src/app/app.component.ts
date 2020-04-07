import { Component } from '@angular/core';
import { AccelerometerService } from './services/measurements.service';

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
