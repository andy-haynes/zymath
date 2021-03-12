import _ from 'lodash';

import {
  TemperatureMeasurement,
  TemperatureUnit,
  TimeMeasurement,
  TimeUnit,
  VolumeMeasurement,
  VolumePerTimeRatio,
  VolumePerWeightRatio,
  VolumeUnit,
  WeightMeasurement,
  WeightUnit,
} from '../types/measurement';
import { convertRatio, convertToUnit } from './measurement';

export function calculateBoilVolume({
  absorptionLossRatio,
  boilTime,
  boilOffRatio,
  fermentableWeight,
  mashThicknessRatio,
  targetVolume,
}: {
  absorptionLossRatio: VolumePerWeightRatio,
  boilTime: TimeMeasurement,
  boilOffRatio: VolumePerTimeRatio,
  fermentableWeight: WeightMeasurement,
  mashThicknessRatio: VolumePerWeightRatio,
  targetVolume: VolumeMeasurement,
}): VolumeMeasurement {
  const volumeUnit = targetVolume.unit;
  const weightUnit = mashThicknessRatio.consequent;

  const convertedWeight = convertToUnit({
    measurement: fermentableWeight,
    unit: weightUnit,
  });

  const convertedAbsorption = convertRatio({
    oldRatio: absorptionLossRatio,
    newRatio: { antecedent: volumeUnit, consequent: weightUnit, value: 1 },
  });

  const convertedBoilOff = convertRatio({
    oldRatio: boilOffRatio,
    newRatio: { antecedent: volumeUnit, consequent: TimeUnit.Minute, value: 1 }
  });

  const boilMinutes = convertToUnit({ measurement: boilTime, unit: TimeUnit.Minute }).value;
  const boilLoss = boilMinutes * convertedBoilOff.value;
  const absorptionLoss = convertedWeight.value * convertedAbsorption.value;

  return {
    unit: volumeUnit,
    value: _.round(targetVolume.value + boilLoss + absorptionLoss, 1),
  };
}

export function calculateStrikeVolume({ fermentableWeight, mashThickness }: {
  fermentableWeight: WeightMeasurement,
  mashThickness: VolumePerWeightRatio,
}): VolumeMeasurement {
  const weight = convertToUnit({
    measurement: fermentableWeight,
    unit: mashThickness.consequent
  });

  return {
    unit: mashThickness.antecedent,
    value: _.round(weight.value * mashThickness.value, 1),
  };
}

export function calculateSpargeVolume({ boilVolume, strikeVolume }: {
  boilVolume: VolumeMeasurement,
  strikeVolume: VolumeMeasurement,
}): VolumeMeasurement {
  const boilVolumeInStrikeUnits = convertToUnit({
    measurement: boilVolume,
    precision: 1,
    unit: strikeVolume.unit,
  }).value;

  return {
    unit: strikeVolume.unit,
    value: _.round(boilVolumeInStrikeUnits - strikeVolume.value, 1),
  };
}

export function calculateStrikeWaterTemp({ mashThickness, sourceTemperature, targetTemperature }: {
  mashThickness: VolumePerWeightRatio,
  sourceTemperature: TemperatureMeasurement,
  targetTemperature: TemperatureMeasurement,
}): TemperatureMeasurement {
  const source = convertToUnit({
    measurement: sourceTemperature,
    unit: TemperatureUnit.Fahrenheit,
  });

  const target = convertToUnit({
    measurement: targetTemperature,
    unit: TemperatureUnit.Fahrenheit,
  });

  const mashThicknessValue = convertRatio({
    oldRatio: mashThickness,
    newRatio: { antecedent: VolumeUnit.Quart, consequent: WeightUnit.Pound, value: 1 },
  }).value;

  const deltaT = ((0.2 / mashThicknessValue) * (target.value - source.value)) + target.value;
  return {
    value: _.round(deltaT, 1),
    unit: TemperatureUnit.Fahrenheit
  };
}

export function calculateMashoutWaterTemp({
  fermentableWeight,
  infusionTemperature,
  mashoutTemperature,
  spargeVolume,
  strikeVolume,
}: {
  fermentableWeight: WeightMeasurement,
  infusionTemperature: TemperatureMeasurement,
  mashoutTemperature: TemperatureMeasurement,
  spargeVolume: VolumeMeasurement,
  strikeVolume: VolumeMeasurement,
}): TemperatureMeasurement {
  const mashoutF = convertToUnit({
    measurement: mashoutTemperature,
    unit: TemperatureUnit.Fahrenheit,
  }).value;

  const deltaT = mashoutF - convertToUnit({
    measurement: infusionTemperature,
    unit: TemperatureUnit.Fahrenheit
  }).value;

  const weight = convertToUnit({ measurement: fermentableWeight, unit: WeightUnit.Pound }).value;
  const strike = convertToUnit({ measurement: strikeVolume, unit: VolumeUnit.Quart }).value;
  const sparge = convertToUnit({ measurement: spargeVolume, unit: VolumeUnit.Quart }).value;

  return {
    value: _.round((deltaT * ((0.2 * weight * strike) / sparge)) + mashoutF, 1),
    unit: TemperatureUnit.Fahrenheit
  };
}
