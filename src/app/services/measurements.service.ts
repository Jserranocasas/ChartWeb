import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accelerometer } from '../interfaces/measurements.interface';

@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  constructor(private http: HttpClient){

    this.loadMeasurements();

  }

  private loadMeasurements(){
    this.http.get('https://awareapp-fee69.firebaseio.com/Measurements.json')
      .subscribe( (resp: any) => {
          // console.log(resp['HUAWEI JSN-L21'].accelerometer['25-03-2020-19-27']);
      });
  }
}
