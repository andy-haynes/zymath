// TODO get boil volume and gravity values as a function of addition time
import _ from 'lodash';

import { Hop, HopAddition, HopAdditionType } from '../types/hops';
import { TimeUnit, VolumeMeasurement, VolumeUnit, WeightUnit } from '../types/measurement';
import { convertToUnit } from './measurement';

export function getUtilizationFactor(additionType: HopAdditionType): number {
  switch (additionType) {
    case HopAdditionType.FirstWort:
      return 1.1;
    case HopAdditionType.Whirlpool:
    case HopAdditionType.DryHop:
      return 0;
    case HopAdditionType.Boil:
    case HopAdditionType.Flameout:
    default:
      return 1.0
  }
}

export function calculateUtilization({ addition, gravity }: {
  addition: HopAddition,
  gravity: number,
}): number {
  const { value: additionMinutes } = convertToUnit({
    measurement: addition.time,
    unit: TimeUnit.Minute,
  });
  const fG = 1.65 * Math.pow(0.000125, gravity - 1);
  const fT = (1 - Math.pow(Math.E, -0.04 * additionMinutes)) / 4.15;
  return fG * fT * getUtilizationFactor(addition.type);
}

export function calculateIBU({ addition, alpha, gravity, boilVolume }: {
  addition: HopAddition,
  alpha: number,
  boilVolume: VolumeMeasurement,
  gravity: number,
}): number {
  const aau = alpha * convertToUnit({
    measurement: addition.quantity,
    unit: WeightUnit.Ounce,
  }).value;

  const utilization = calculateUtilization({ addition, gravity });
  return (aau * utilization * 75) / convertToUnit({
    measurement: boilVolume,
    unit: VolumeUnit.Gallon,
  }).value;
}

export function calculateTotalUtilization({ additions, gravity }: {
  additions: HopAddition[],
  gravity: number,
}): number {
  return _.sumBy(additions, addition => calculateUtilization({
    addition,
    gravity,
  }));
}

export function calculateTotalIBU({ boilVolume, gravity, hops }: {
  boilVolume: VolumeMeasurement,
  hops: Hop[],
  gravity: number,
}): number {
  return _.sumBy(hops, (hop: Hop) => {
    return _.sumBy(
      hop.additions,
      (addition: HopAddition) => calculateIBU({
        addition,
        alpha: hop.alpha,
        boilVolume,
        gravity,
      })
    );
  });
}
