import {
  TimeUnit,
  VolumeUnit,
  WeightUnit,
} from '../types/measurement';

type UnitConversionTable = {
  [unit: string]: {
    [conversionCoefficient: string]: number
  }
};

const unitConversions: UnitConversionTable = {
  [VolumeUnit.Gallon]: {
    [VolumeUnit.Quart]:      4,
    [VolumeUnit.FluidOunce]: 128,
    [VolumeUnit.Cup]:        16,
    [VolumeUnit.Liter]:      3.78541,
    [VolumeUnit.Milliliter]: 3785.41
  },
  [VolumeUnit.Quart]: {
    [VolumeUnit.Gallon]:     0.25,
    [VolumeUnit.FluidOunce]: 32,
    [VolumeUnit.Cup]:        4,
    [VolumeUnit.Liter]:      0.946353,
    [VolumeUnit.Milliliter]: 946.353
  },
  [VolumeUnit.FluidOunce]: {
    [VolumeUnit.Gallon]:     0.0078125,
    [VolumeUnit.Quart]:      0.03125,
    [VolumeUnit.Cup]:        0.123223,
    [VolumeUnit.Liter]:      0.0295735,
    [VolumeUnit.Milliliter]: 29.5735
  },
  [VolumeUnit.Cup]: {
    [VolumeUnit.Gallon]:     0.0634013,
    [VolumeUnit.Quart]:      0.253605,
    [VolumeUnit.FluidOunce]: 8.11537,
    [VolumeUnit.Liter]:      0.24,
    [VolumeUnit.Milliliter]: 240
  },
  [VolumeUnit.Liter]: {
    [VolumeUnit.Gallon]:     0.264172,
    [VolumeUnit.Quart]:      1.05669,
    [VolumeUnit.FluidOunce]: 33.814,
    [VolumeUnit.Cup]:        4.16667,
    [VolumeUnit.Milliliter]: 1000
  },
  [VolumeUnit.Milliliter]: {
    [VolumeUnit.Gallon]:     0.000264172,
    [VolumeUnit.Quart]:      0.00105669,
    [VolumeUnit.FluidOunce]: 0.033814,
    [VolumeUnit.Cup]:        0.00416667,
    [VolumeUnit.Liter]:      0.001
  },
  [WeightUnit.Pound]: {
    [WeightUnit.Ounce]:    16,
    [WeightUnit.Kilogram]: 0.453592,
    [WeightUnit.Gram]:     453.592
  },
  [WeightUnit.Ounce]: {
    [WeightUnit.Pound]:    0.0625,
    [WeightUnit.Kilogram]: 0.0283495,
    [WeightUnit.Gram]:     28.3495
  },
  [WeightUnit.Kilogram]: {
    [WeightUnit.Pound]:    2.20462,
    [WeightUnit.Ounce]:    35.274,
    [WeightUnit.Gram]:     1000
  },
  [WeightUnit.Gram]: {
    [WeightUnit.Pound]:    0.00220462,
    [WeightUnit.Ounce]:    0.035274,
    [WeightUnit.Kilogram]: 0.001
  },
  [TimeUnit.Hour]: {
    [TimeUnit.Minute]: 60
  },
  [TimeUnit.Minute]: {
    [TimeUnit.Hour]: 0.01666667
  }
};

export default unitConversions;
