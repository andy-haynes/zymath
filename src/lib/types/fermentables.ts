import { WeightMeasurement } from './measurement';

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
