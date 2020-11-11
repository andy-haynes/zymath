import _ from 'lodash';

import UnitConversionTable from '../constants/unit_conversion';
import {
  Measurement,
  MeasurementRatio,
  MeasurementUnit,
  TemperatureMeasurement,
  TemperatureUnit,
} from '../types/measurement';

function celsiusToFahrenheit(degreesCelsius: number): number {
  return (degreesCelsius * 9/5) + 32;
}

function fahrenheitToCelsius(degreesFahrenheit: number): number {
  return (degreesFahrenheit - 32) * 5/9;
}

export function convertRatio({ oldRatio, newRatio, precision }: {
  newRatio: MeasurementRatio,
  oldRatio: MeasurementRatio,
  precision?: number,
}): MeasurementRatio {
  let value = newRatio.value || oldRatio.value || 0;
  let multiplier = 1;
  let divisor = 1;

  if (oldRatio.antecedent !== newRatio.antecedent) {
    multiplier = convertToUnit({
      measurement: { value: 1, unit: oldRatio.antecedent },
      unit: newRatio.antecedent
    }).value;
  }

  if (oldRatio.consequent !== newRatio.consequent) {
    divisor = convertToUnit({
      measurement: { value: 1, unit: oldRatio.consequent },
      unit: newRatio.consequent
    }).value;
  }

  const factor = multiplier / divisor;
  value *= factor;

  if (precision) {
    value = _.round(value, precision);
  }

  return { ...newRatio, value };
}

function convertTemperature({ temperature, unit } : {
  temperature: TemperatureMeasurement,
  unit: TemperatureUnit
}): TemperatureMeasurement {
  if (temperature.unit === unit) {
    return { ...temperature };
  }

  if (temperature.unit === TemperatureUnit.Fahrenheit) {
    return {
      unit: TemperatureUnit.Celsius,
      value: fahrenheitToCelsius(temperature.value),
    };
  }

  return {
    unit: TemperatureUnit.Fahrenheit,
    value: celsiusToFahrenheit(temperature.value),
  };
}

export function convertToUnit({ measurement, precision, unit } : {
  measurement: Measurement,
  precision?: number,
  unit: MeasurementUnit,
}): Measurement {
  const { value } = measurement;
  if (measurement.unit !== unit) {
    if (unit === TemperatureUnit.Fahrenheit || unit === TemperatureUnit.Celsius) {
      return convertTemperature({
        temperature: <TemperatureMeasurement>measurement,
        unit,
      });
    }

    const converted = value * UnitConversionTable[measurement.unit][unit];
    return {
      unit,
      value: precision ? _.round(converted, precision) : converted,
    };
  }

  return {
    ...measurement,
    value,
  };
}
