import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AccelerometerService } from '../../services/measurements.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gyroscope',
  templateUrl: './gyroscope.component.html',
  styleUrls: ['./gyroscope.component.css']
})
export class GyroscopeComponent implements OnInit, AfterViewInit {

  subscription: Subscription;

  constructor(private dataServiceChart: AccelerometerService) {
    this.subscription = this.dataServiceChart.dataSetChanged$.subscribe(
      dataSet => this.chart.data(this.dataServiceChart.getData(dataSet))
    );
  }

  @ViewChild('chartContainer') container;

  chart: anychart.charts.Cartesian3d = null;

  ngOnInit() {
      anychart.theme('dark_glamour');
      // create a 3d line chart
      this.chart = anychart.line3d();
      // this.chart.background().fill({
      //   keys: ["#fff", "#66f", "#fff"],
      //   angle: 130,
      // });
      this.chart.zDistribution(true);
      this.chart.title("3D Line Chart");

      // create line series and set the data
      const series1 = this.chart.line(this.dataServiceChart.getData('data1'));
      series1.color('red');

      const series2 = this.chart.line(this.dataServiceChart.getData('data2'));
      series2.color('blue');

      const series3 = this.chart.line(this.dataServiceChart.getData('data3'));
      series3.color('green');
  }

  ngAfterViewInit() {
    this.chart.container(this.container.nativeElement);
    this.chart.draw();
  }
}
