import { TimeMeasurement, WeightMeasurement } from './measurement';

export type Hop = {
  id: string;
  name: string;
  alpha: number;
  beta: number;
  additions: HopAddition[];
  aromaticProfile: string[];
};

export type HopAddition = {
  form: HopFormType;
  time: TimeMeasurement;
  quantity: WeightMeasurement;
  type: HopAdditionType;
};

export enum HopAdditionType {
  Boil = 'boil',
  DryHop = 'dry hop',
  FirstWort = 'first wort',
  HopStand = 'hop stand',
  Whirlpool = 'whirlpool',
}

export enum HopFormType {
  Pellet = 'pellet',
  WholeLeaf = 'whole leaf',
}
