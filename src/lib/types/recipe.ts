import { TemperatureMeasurement, WeightMeasurement } from './measurement';

export enum ExtractType {
  Dry = 'dry',
  Liquid = 'liquid',
}

export type Fermentable = {
  name: string;
  color: string;
  extractType?: ExtractType;
  gravity: string|null;
  isExtract: boolean;
  lovibond: number|null;
  weight: WeightMeasurement;
};

export type HopAddition = {
  minutes: number;
  quantity: WeightMeasurement;
  type: HopAdditionType;
  ibu: number;
  utilization: number;
};

export type Hop = {
  name: string;
  alpha: number;
  beta: number;
  additions: HopAddition[];
  aromaticProfile: string[];
  form: HopFormType;
};

export enum HopAdditionType {
  Boil = 'boil',
  DryHop = 'dry hop',
  HopStand = 'hop stand',
  Whirlpool = 'whirlpool',
}

export enum HopFormType {
  Pellet = 'pellet',
  WholeLeaf = 'whole leaf',
}

export enum IngredientType {
  Malt = 'malt',
  Hop = 'hop',
  Yeast = 'yeast',
}

export enum LossType {
  Boil = 'boil',
  DeadSpace = 'dead space',
  Grains = 'grains',
  Hops = 'hops',
}

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

export enum StarterAdditionType {
  Energizer = 'energizer',
  Fermentable = 'fermentable',
  Nutrient = 'nutrient',
}

export type Yeast = {
  name: string;
  code: string;
  pitchRate?: number;
  pitchTemp?: TemperatureMeasurement;
  quantity: number;
  targetCellCount: number;
  styles?: string;
};
