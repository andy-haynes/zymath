import _ from 'lodash';

import {
  NamedMeasurementUnit,
  TemperatureUnit,
  TimeUnit,
  VolumeUnit,
  WeightUnit,
} from '../types/measurement';

const units = [{
  unit: WeightUnit.Pound,
  name: 'pound',
  shortName: 'lbs',
  shorterName: '#',
}, {
  unit: WeightUnit.Ounce,
  name: 'ounce',
  shortName: 'oz',
}, {
  unit: WeightUnit.Kilogram,
  name: 'kilogram',
  shortName: 'kg',
}, {
  unit: WeightUnit.Gram,
  name: 'gram',
  shortName: 'g',
}, {
  unit: VolumeUnit.Gallon,
  name: 'gallon',
  shortName: 'gal',
  shorterName: 'g',
}, {
  unit: VolumeUnit.Quart,
  name: 'quart',
  shortName: 'qt',
}, {
  unit: VolumeUnit.FluidOunce,
  name: 'fl oz',
  shortName: 'oz',
}, {
  unit: VolumeUnit.Liter,
  name: 'liter',
  shortName: 'l',
}, {
  unit: VolumeUnit.Milliliter,
  name: 'milliliter',
  shortName: 'ml',
}, {
  unit: TimeUnit.Minute,
  name: 'minute',
  shortName: 'min',
}, {
  unit: TimeUnit.Hour,
  name: 'hour',
  shorterName: 'hr',
}, {
  unit: TimeUnit.Day,
  name: 'day',
  shortName: 'days',
}, {
  unit: TemperatureUnit.Fahrenheit,
  name: 'fahrenheit',
  shortName: '˚F',
}, {
  unit: TemperatureUnit.Celsius,
  name: 'celsius',
  shortName: '˚C',
}];

const namedMeasurementMeasurementUnit: { [unit: string]: NamedMeasurementUnit } = _.keyBy(
  units,
  'unit'
);

export default namedMeasurementMeasurementUnit;
