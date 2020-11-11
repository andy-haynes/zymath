import _ from 'lodash';

import UnitConversionTable from '../constants/unit_conversion';
import {
  Measurement,
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
