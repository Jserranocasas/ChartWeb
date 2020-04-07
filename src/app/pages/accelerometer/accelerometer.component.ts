import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { AccelerometerService } from '../../services/measurements.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accelerometer',
  templateUrl: './accelerometer.component.html',
  styleUrls: ['./accelerometer.component.css']
})
export class AccelerometerComponent implements OnInit, AfterViewInit {

  subscription: Subscription;

  constructor(private dataServiceChart: AccelerometerService) {
    this.subscription = this.dataServiceChart.dataSetChanged$.subscribe(
      dataSet => this.chart.data(this.dataServiceChart.getData(dataSet))
    );
  }

  @ViewChild('chartContainer') container;

  chart: anychart.charts.Pie = null;

  ngOnInit() {
    // Default data set mapping, hardcoded here.
    this.chart = anychart.pie(this.dataServiceChart.getData('data1'));
  }

  ngAfterViewInit() {
    this.chart.container(this.container.nativeElement);
    this.chart.draw();
  }

}

