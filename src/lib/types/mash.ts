import { TemperatureMeasurement, TimeMeasurement } from './measurement';

export type MashProfile = {
  schedule: MashSchedule;
};

export type MashRest = {
  type: RestType;
  temperature: TemperatureMeasurement;
  time: TimeMeasurement;
};

export type MashSchedule = {
  efficiency: number;
  method: MashMethod;
  rests: MashRest[];
  sparge: SpargeMethod;
  recirculated: boolean;
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

export enum RestType {
  Acid = 'acid',
  AlphaAmylase = 'alpha amylase',
  BetaAmylase = 'beta amylase',
  BetaGlucanase = 'beta glucanase',
  Decoction = 'decoction',
  FerulicAcid = 'ferulic acid',
  Protease = 'protease',
}
