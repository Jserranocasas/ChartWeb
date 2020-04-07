import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GyroscopeService } from '../../services/gyroscope.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gyroscope',
  templateUrl: './gyroscope.component.html',
  styleUrls: ['./gyroscope.component.css']
})
export class GyroscopeComponent implements OnInit, AfterViewInit {

  subscription: Subscription;

  constructor(private dataServiceChart: GyroscopeService) {
    this.subscription = this.dataServiceChart.dataSetChanged$.subscribe(
      dataSet => this.chart.data(this.dataServiceChart.getData(dataSet))
    );
  }

  @ViewChild('chartContainer') container;

  chart: anychart.charts.Cartesian3d = null;

  ngOnInit() {
      // create and custom a 3d line chart
      this.chart = anychart.line3d();

      this.chart.xAxis().title('Fecha');
      this.chart.yAxis().title('Eje de coordenadas');
      this.chart.background().fill('#6A5ACD 0.2');
      this.chart.background().cornerType('cut');
      this.chart.background().corners(5, 5, 5, 5);
      this.chart.background().stroke('2 black');
      this.chart.zDistribution(true);
      this.chart.title('Datos Recogidos para el Giroscopio');
      this.chart.legend(true);

      // create line series and set the data
      const series1 = this.chart.line(this.dataServiceChart.getData('data1')).name('X');
      series1.color('red');

      const series2 = this.chart.line(this.dataServiceChart.getData('data2')).name('Y');
      series2.color('blue');

      const series3 = this.chart.line(this.dataServiceChart.getData('data3')).name('Z');
      series3.color('green');
  }

  ngAfterViewInit() {
    // set the container for the legend and the chart
    this.chart.container(this.container.nativeElement);

    // draw the legend and chart
    this.chart.draw();
  }
}
