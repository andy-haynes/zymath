export type Measurement = TemperatureMeasurement
  | TimeMeasurement
  | VolumeMeasurement
  | WeightMeasurement;

export type MeasurementRatio = VolumePerWeightRatio
  | VolumePerTimeRatio;

export type MeasurementUnit = TemperatureUnit
  | TimeUnit
  | VolumeUnit
  | WeightUnit;

export type NamedMeasurementUnit = {
  unit: MeasurementUnit;
  name: string;
  shortName?: string;
  shorterName?: string;
};

export type RatioMeasurement<T extends MeasurementUnit, V extends MeasurementUnit> = {
  antecedent: T;
  consequent: V;
  value: number;
};

export type TemperatureMeasurement = ValueMeasurement<TemperatureUnit>;

export enum TemperatureUnit {
  Celsius = 'celsius',
  Fahrenheit = 'fahrenheit',
}

export type TimeMeasurement = ValueMeasurement<TimeUnit>;

export enum TimeUnit {
  Day = 'day',
  Hour = 'hour',
  Minute = 'minute',
}

export type ValueMeasurement<T extends MeasurementUnit> = {
  value: number;
  unit: T;
};

export type VolumeMeasurement = ValueMeasurement<VolumeUnit>;

export type VolumePerTimeRatio = RatioMeasurement<VolumeUnit, TimeUnit>;

export type VolumePerWeightRatio = RatioMeasurement<VolumeUnit, WeightUnit>;

export enum VolumeUnit {
  Cup = 'cup',
  FluidOunce = 'fluid_ounce',
  Gallon = 'gallon',
  Liter = 'liter',
  Milliliter = 'milliliter',
  Quart = 'quart',
}

export type WeightMeasurement = ValueMeasurement<WeightUnit>;

export enum WeightUnit {
  Gram = 'gram',
  Kilogram = 'kilogram',
  Ounce = 'ounce',
  Pound = 'pound',
}
