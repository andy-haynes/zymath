import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import _ from 'lodash';

import { gravityToPoints, pointsToGravity } from './gravity';
import { VolumeMeasurement, VolumeUnit } from '../types/measurement';
import { gravityToPlato } from './gravity';
import { convertToUnit } from './measurement';

export function calculateAlcoholByVolume({ finalGravity, originalGravity }: {
  finalGravity: number,
  originalGravity: number,
}): number {
  return _.round((originalGravity - finalGravity) * 131.25, 1);
}

export function calculateCellCount({ manufactureDate, startingCount }: {
  manufactureDate: Dayjs,
  // starterSteps: StarterAdditionType,
  startingCount: number,
}): number {
  return startingCount * (calculateYeastViability(manufactureDate) / 100);
}

export function calculateFinalGravity({ apparentAttenuation, originalGravity }: {
  apparentAttenuation: number,
  originalGravity: number,
}) {
  const ogPoints = gravityToPoints(originalGravity);
  return pointsToGravity(ogPoints - (ogPoints * apparentAttenuation));
}

export function calculateRecommendedCellCount({ pitchRate, originalGravity, targetVolume }: {
  pitchRate: number,
  originalGravity: number,
  targetVolume: VolumeMeasurement,
}): number {
  const millionsOfCells = Math.pow(10, 6) * pitchRate;
  const volumeInMilliliters = convertToUnit({
    measurement: targetVolume,
    unit: VolumeUnit.Milliliter
  }).value;

  return millionsOfCells * volumeInMilliliters * gravityToPlato(originalGravity);
}

export function calculateYeastViability(manufactureDate: Dayjs): number {
  const monthsSinceMfg = dayjs().diff(manufactureDate, 'month');
  return _.round(Math.max(96.2 - (21.5 * monthsSinceMfg), 10), 1);
}
