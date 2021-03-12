import { WeightMeasurement } from './measurement';

export type Hop = {
  name: string;
  alpha: number;
  beta: number;
  additions: HopAddition[];
  aromaticProfile: string[];
  form: HopFormType;
};

export type HopAddition = {
  minutes: number;
  quantity: WeightMeasurement;
  type: HopAdditionType;
  ibu: number;
  utilization: number;
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
