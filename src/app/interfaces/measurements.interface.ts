export interface Light {
  date: Date;
  luminosity: number;
}

export interface Battery {
  date: Date;
  level: number;
  temperature: number;
  voltage: number;
}

export interface Accelerometer {
  date: Date;
  x: number;
  y: number;
  z: number;
}

export interface Gyroscope {
    date: Date;
    x: number;
    y: number;
    z: number;
}

export interface Magnetometer {
    date: Date;
    x: number;
    y: number;
    z: number;
}

export interface Rotation {
    date: Date;
    x: number;
    y: number;
    z: number;
}
