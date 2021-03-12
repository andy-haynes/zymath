import { BrewInstance } from './brewing';
import { Fermentable } from './fermentables';
import { Ferment } from './fermentation';
import { Hop } from './hops';
import { MashProfile } from './mash';
import { VolumeMeasurement } from './measurement';
import { Yeast } from './yeast';

export type Recipe = {
  id: string;
  name: string;
  style: RecipeStyle;
  brewInstances: BrewInstance[];
  fermentables: Fermentable[];
  hops: Hop[];
  yeast: Yeast[];
  mash: MashProfile
  ferments: Ferment[];
  targetVolume: VolumeMeasurement;
};

export type RecipeStyle = {
  ABV: string;
  appearance: string;
  aroma: string;
  category: string;
  characteristicIngredients: string;
  code: string;
  comments: string;
  commercialExamples: string[];
  FG: string;
  flavor: string;
  history: string;
  IBUs: string;
  mouthfeel: string;
  name: string;
  OG: string;
  overallImpression: string;
  SRM: string;
  styleComparison: string;
  tags: string[];
}
