import _ from 'lodash';

export function formatGravity(gravity: number): string {
  if (gravity === 1) {
    return '1.000';
  }
  return gravity === 1 ? '1.000' : `${gravity.toString()}000`.substring(0, 5);
}

export function gravityToPoints(gravity: number): number {
  if (isNaN(gravity)) {
    return 0;
  }

  return (gravity - 1) * 1000;
}

export function pointsToGravity(points: number): number {
  if (isNaN(points)) {
    return 1;
  }

  return _.round(1 + (points / 1000), 3);
}

export function gravityToPlato(gravity: number): number {
  return gravityToPoints(gravity) / 4;
}

export function platoToGravity(plato: number): number {
  return pointsToGravity(plato * 4);
}
