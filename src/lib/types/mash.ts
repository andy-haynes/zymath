import { TemperatureMeasurement } from './measurement';

export type MashProfile = {
  schedule: MashSchedule;
};

export type MashRest = {
  temperature: TemperatureMeasurement;
  minutes: number;
};

export type MashSchedule = {
  efficiency: number;
  method: string;
  rests: MashRest[];
  sparge: string;
};

export enum MashMethod {
  BIAB = 'biab',
  Decoction = 'decoction',
  Infusion = 'infusion',
}

export enum SpargeMethod {
  None = 'no sparge',
  Batch = 'batch sparge',
  Fly = 'fly sparge',
}
