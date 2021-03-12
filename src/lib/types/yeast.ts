import { TemperatureMeasurement } from './measurement';

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
