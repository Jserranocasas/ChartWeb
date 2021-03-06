import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceService } from './singleton.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightService {

  // Observable string stream
  private dataSetChangeSource = new Subject<string>();

  // Observable string stream
  dataSetChanged$ = this.dataSetChangeSource.asObservable();

  private dataChart: Array<object> = [];

  private dataSetChart: anychart.data.Set = anychart.data.set(this.dataChart);

  private mappingsChart: { [key: string]: anychart.data.View } = {
    data1: this.dataSetChart.mapAs({x: ['dateKey'], value: ['luminosity']}),
  };

  constructor(private http: HttpClient, private singleton: DeviceService){
      this.loadMeasurements();
  }

  public updateDataSet() {
    let i;
    const size = this.dataSetChart.getRowsCount();
    for (i = 0; i < size; i++){
      this.dataSetChart.remove(this.dataSetChart.getRowsCount() - 1);
    }

    this.loadMeasurements();
  }

  private loadMeasurements(){
    this.http.get('https://awareapp-fee69.firebaseio.com/Measurements.json')
      .subscribe( (resp: any) => {
        for (const[key, value] of Object.entries(resp[this.singleton.DeviceCurrent].light)) {
            this.dataSetChart.append({dateKey: key, luminosity: value['luminosity']});
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
