import _ from 'lodash';

import { ExtractGravity } from '../constants/gravity';
import SrmRgb from '../constants/srm_rgb';
import { Fermentable } from '../types/fermentables';
import { VolumeMeasurement, VolumeUnit, WeightMeasurement, WeightUnit } from '../types/measurement';
import { gravityToPoints, pointsToGravity } from './gravity';
import { convertToUnit } from './measurement';

function calculateMaltColorUnit({ lovibond, volume, weight } : {
  lovibond: number,
  volume: VolumeMeasurement,
  weight: WeightMeasurement,
}): number {
  const weightInPounds = convertToUnit({ measurement: weight, unit: WeightUnit.Pound }).value;
  const volumeInGallons = convertToUnit({ measurement: volume, unit: VolumeUnit.Gallon }).value;
  return weightInPounds * (lovibond / volumeInGallons);
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

export function calculateSrm({ fermentables, targetVolume } :{
  fermentables: Fermentable[],
  targetVolume: VolumeMeasurement
}): number {
  const totalMCU = _.sumBy(fermentables, ({ lovibond, weight }) => {
    if (!lovibond || isNaN(lovibond)) {
      return 0;
    }

    return calculateMaltColorUnit({
      volume: targetVolume,
      lovibond,
      weight,
    });
  });

  return 1.4922 * Math.pow(totalMCU, 0.6859);
}

/* http://byo.com/mead/item/1544-understanding-malt-spec-sheets-advanced-brewing */
export function dbfgToGravity(dbfg: number): number {
  return _.round(1 + ((dbfg / 100) * 0.04621), 3);
}

export function getSrmColor(srm: number): string | undefined {
  const boundedSrm = _.max([srm, 40]) || 0;
  return SrmRgb[boundedSrm];
}
