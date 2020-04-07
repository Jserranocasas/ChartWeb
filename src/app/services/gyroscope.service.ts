import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GyroscopeService {

  // Observable string stream
  private dataSetChangeSource = new Subject<string>();

  // Observable string stream
  dataSetChanged$ = this.dataSetChangeSource.asObservable();

  private dataChart: Array<object> = [];

  private dataSetChart: anychart.data.Set = anychart.data.set(this.dataChart);

  private mappingsChart: { [key: string]: anychart.data.View } = {
    data1: this.dataSetChart.mapAs({x: ['dateKey'], value: ['x']}),
    data2: this.dataSetChart.mapAs({x: ['dateKey'], value: ['y']}),
    data3: this.dataSetChart.mapAs({x: ['dateKey'], value: ['z']})
  };

  constructor(private http: HttpClient){
      this.loadMeasurements();
  }

  private loadMeasurements(){
    this.http.get('https://awareapp-fee69.firebaseio.com/Measurements.json')
      .subscribe( (resp: any) => {
        for (const[key, value] of Object.entries(resp['HUAWEI JSN-L21'].gyroscope)) {
          this.dataSetChart.append({dateKey: key, x: value['x'], y: value['y'], z: value['z']});
        }
      });
  }

  public getDataList() {
    const res: Array<string> = [];
    for (const key in this.mappingsChart) {
      if (this.mappingsChart.hasOwnProperty(key)) {
        res.push(key);
      }
    }
    return res;
  }

  public getData(key: string = 'data1') {
    return this.mappingsChart[key];
  }

  public setCurrentDataSet(key: string = 'data1') {
    this.dataSetChangeSource.next(key);
  }
}
