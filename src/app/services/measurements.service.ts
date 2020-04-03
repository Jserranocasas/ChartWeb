import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accelerometer } from '../interfaces/measurements.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  // constructor(private http: HttpClient){

  //   this.loadMeasurements();

  // }

  // private loadMeasurements(){
  //   this.http.get('https://awareapp-fee69.firebaseio.com/Measurements.json')
  //     .subscribe( (resp: any) => {
  //         // console.log(resp['HUAWEI JSN-L21'].accelerometer['25-03-2020-19-27']);
  //     });
  // }

  // Observable string stream
  private dataSetChangeSource = new Subject<string>();

  // Observable string stream
  dataSetChanged$ = this.dataSetChangeSource.asObservable();

  private dataChart: Array<Object> = [
    {customName: 'Name1', customValue1: 10, customValue2: 12, customValue3: 7},
    {customName: 'Name2', customValue1: 14, customValue2: 10, customValue3: 17},
    {customName: 'Name3', customValue1: 21, customValue2: 4, customValue3: 15},
  ];

  private dataSetChart: anychart.data.Set = anychart.data.set(this.dataChart);

  private mappingsChart: { [key: string]: anychart.data.View } = {
    data1: this.dataSetChart.mapAs({x: ['customName'], value: ['customValue1']}),
    data2: this.dataSetChart.mapAs({x: ['customName'], value: ['customValue2']}),
    data3: this.dataSetChart.mapAs({x: ['customName'], value: ['customValue3']})
  };


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
