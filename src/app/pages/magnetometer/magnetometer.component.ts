import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MagnetometerService } from '../../services/magnetometer.service';
import { DeviceService } from 'src/app/services/singleton.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-magnetometer',
  templateUrl: './magnetometer.component.html',
  styleUrls: ['./magnetometer.component.css']
})
export class MagnetometerComponent implements OnInit, AfterViewInit {

  subscription: Subscription;

  constructor(private dataServiceChart: MagnetometerService, private singleton: DeviceService) {
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
      this.chart.title('Datos Recogidos para el Magnetómetro');
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

  ngChangeToJSN(){
    this.singleton.DeviceJSN();
    this.dataServiceChart.updateDataSet();
  }

  ngChangeToPOT(){
    this.singleton.DevicePOT();
    this.dataServiceChart.updateDataSet();
  }
}
