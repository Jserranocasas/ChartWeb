import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BatteryService } from '../../services/battery.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.css']
})
export class BatteryComponent implements OnInit, AfterViewInit {

  subscription: Subscription;

  constructor(private dataServiceChart: BatteryService) {
    this.subscription = this.dataServiceChart.dataSetChanged$.subscribe(
      dataSet => this.chart1.data(this.dataServiceChart.getData(dataSet))
    );
    this.subscription = this.dataServiceChart.dataSetChanged$.subscribe(
      dataSet => this.chart2.data(this.dataServiceChart.getData(dataSet))
    );
  }

  @ViewChild('chartContainer') container;

  chart1: anychart.charts.Cartesian3d = null;
  chart2: anychart.charts.Cartesian3d = null;

  ngOnInit() {
      // create and custom a 3d line chart
      this.chart1 = anychart.area3d();
      this.chart2 = anychart.area3d();

      this.chart1.xAxis().title('Fecha');
      this.chart1.yAxis().title('Voltage');
      this.chart1.background().fill('#6A5ACD 0.2');
      this.chart1.background().cornerType('cut');
      this.chart1.background().corners(5, 5, 5, 5);
      this.chart1.background().stroke('2 black');
      this.chart1.zDistribution(true);
      this.chart1.title('Datos Recogidos para la Batería');

      this.chart2.xAxis().title('Fecha');
      this.chart2.yAxis().title('Valores');
      this.chart2.background().fill('#6A5ACD 0.2');
      this.chart2.background().cornerType('cut');
      this.chart2.background().corners(5, 5, 5, 5);
      this.chart2.background().stroke('2 black');
      this.chart2.zDistribution(true);
      this.chart2.legend(true);

      // create line series and set the data
      const series1 = this.chart1.area(this.dataServiceChart.getData('data3')).name('Voltage');
      series1.color('SlateBlue');
      series1.hatchFill("verticalBrick");

            // create line series and set the data
      const series2 = this.chart2.area(this.dataServiceChart.getData('data1')).name('Level');
      series2.color('Pink');
      series2.hatchFill("confetti");

                  // create line series and set the data
      const series3 = this.chart2.area(this.dataServiceChart.getData('data2')).name('Temperature');
      series3.color('MediumOrchid');
      series3.hatchFill("weave");
  }

  ngAfterViewInit() {
    // set the container for the legend and the chart
    this.chart1.container(this.container.nativeElement);

    // draw the legend and chart
    this.chart1.draw();

    // set the container for the legend and the chart
    this.chart2.container(this.container.nativeElement);

    // draw the legend and chart
    this.chart2.draw();
  }
}
