import { Ferment } from './fermentation';
import { Recipe } from './recipe';

export type BrewInstance = {
  id: string;
  dateRange: DateRange;
  ferment: Ferment;
  notes: Note[];
  recipe: Recipe;
};

export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export type Note = {
  text: string;
  timestamp: Date;
};
