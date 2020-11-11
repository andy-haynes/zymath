export type Measurement = TemperatureMeasurement
  | TimeMeasurement
  | VolumeMeasurement
  | WeightMeasurement;

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
