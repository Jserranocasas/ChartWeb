import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from 'src/app/services/singleton.service';
import { LightService } from '../../services/light.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit, AfterViewInit {

  subscription: Subscription;

  constructor(private dataServiceChart: LightService, private singleton: DeviceService) {
    this.subscription = this.dataServiceChart.dataSetChanged$.subscribe(
      dataSet => this.chart.data(this.dataServiceChart.getData(dataSet))
    );
  }

  @ViewChild('chartContainer') container;

  chart: anychart.charts.Cartesian3d = null;

  ngOnInit() {
      // create and custom a 3d line chart
      this.chart = anychart.area3d();

      this.chart.xAxis().title('Fecha');
      this.chart.yAxis().title('Luz Ambiental');
      this.chart.background().fill('#6A5ACD 0.2');
      this.chart.background().cornerType('cut');
      this.chart.background().corners(5, 5, 5, 5);
      this.chart.background().stroke('2 black');
      this.chart.zDistribution(true);
      this.chart.title('Datos Recogidos para la Luz');

      // create line series and set the data
      const series1 = this.chart.area(this.dataServiceChart.getData('data1')).name('Luminosidad');
      series1.color('SlateBlue');
      series1.hatchFill("verticalBrick");
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
