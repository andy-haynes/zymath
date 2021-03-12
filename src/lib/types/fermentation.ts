import {
  BrewInstance,
  DateRange,
  Note,
} from './brewing';
import { FermentationVessel } from './equipment';
import { Recipe } from './recipe';

export type Ferment = {
  id: string;
  recipe: Recipe;
  brewDay: BrewInstance;
  brewInstance: BrewInstance;
  dateRange: DateRange;
  gravityDeltas: GravityDelta[];
  notes: Note[];
  vessels: FermentationVessel[];
};

export type GravityDelta = {
  dateRange: DateRange;
  finalGravity: string;
  originalGravity: string;
};
