import { Injectable, Optional } from '@angular/core';

export class DeviceServiceConfig {
  userName = 'HUAWEI JSN-L21';
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private _userName = 'HUAWEI JSN-L21';

  constructor(@Optional() config?: DeviceServiceConfig) {
    if (config) { this._userName = config.userName; }
  }

  get DeviceCurrent() {
    return this._userName;
  }

  public DeviceJSN() {
      this._userName = 'HUAWEI JSN-L21';
  }

  public DevicePOT() {
      this._userName = 'HUAWEI POT-LX1';
  }
}
