import _ from 'lodash';

import { ExtractGravity } from '../constants/gravity';
import { VolumeMeasurement, VolumeUnit, WeightMeasurement, WeightUnit } from '../types/measurement';
import { Fermentable } from '../types/recipe';
import { gravityToPoints, pointsToGravity } from './gravity';
import { convertToUnit } from './measurement';

function calculateMaltColorUnit({ lovibond, volume, weight } : {
  lovibond: number,
  volume: VolumeMeasurement,
  weight: WeightMeasurement,
}) {
  const weightInPounds = convertToUnit({ measurement: weight, unit: WeightUnit.Pound }).value;
  const volumeInGallons = convertToUnit({ measurement: volume, unit: VolumeUnit.Gallon }).value;
  return weightInPounds * (lovibond / volumeInGallons);
}

export function calculateSRM({ fermentables, targetVolume } :{
  fermentables: Fermentable[],
  targetVolume: VolumeMeasurement
}) {
  const maltColorUnit = _.sumBy(fermentables, ({ lovibond, weight }) => {
    if (!lovibond || isNaN(lovibond)) {
      return 0;
    }

    return calculateMaltColorUnit({
      volume: targetVolume,
      lovibond,
      weight,
    });
  });

  return 1.4922 * Math.pow(maltColorUnit, 0.6859);
}

export function calculatePotentialGravity({ efficiency, fermentables, targetVolume } : {
  efficiency: number,
  fermentables: Fermentable[],
  targetVolume: VolumeMeasurement,
}) {
  const points = _.sumBy(fermentables, (fermentable) => {
    const { extractType, gravity, isExtract, weight } = fermentable;
    const weightInPounds = convertToUnit({ measurement: weight, unit: WeightUnit.Pound }).value;

    if (isExtract && extractType) {
      return ExtractGravity[extractType] * weightInPounds;
    }

    if (!gravity) {
      return 0;
    }

    const gravityPoints = gravityToPoints(parseFloat(gravity));
    return efficiency * gravityPoints * weightInPounds;
  });

  const volumeInGallons = convertToUnit({ measurement: targetVolume, unit: VolumeUnit.Gallon }).value;
  return pointsToGravity(points / volumeInGallons);
}

/* http://byo.com/mead/item/1544-understanding-malt-spec-sheets-advanced-brewing */
export function dbfgToGravity(dbfg: number) {
  return _.round(1 + ((dbfg / 100) * 0.04621), 3);
}
