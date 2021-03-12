import { Ferment } from './fermentation';
import {
  VolumePerTimeRatio,
  VolumeMeasurement,
  VolumePerWeightRatio,
} from './measurement';

export type EquipmentProfile = {
  id: string;
  name: string;
  losses: Loss[];
};

export type FermentationVessel = {
  id: string;
  capacity: VolumeMeasurement;
  ferments: Ferment[];
  name: string;
  type: string;
};

export enum LossType {
  Boil = 'boil',
  DeadSpace = 'dead space',
  Grains = 'grains',
  Hops = 'hops',
}

export type Loss = {
  type: LossType;
  ratio: VolumePerTimeRatio|VolumePerWeightRatio;
};
