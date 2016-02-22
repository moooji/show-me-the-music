'use strict';

export function secondsToHms(d) {
  if (!d) {
    return;
  }

  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);
  return ((h > 0 ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s);
}

export function roundDigits(value, digits) {
  const factor = Math.pow(10, digits);
  return Math.round(value * factor) / factor;
}

export function toPercentage(value, digits) {
  const factor = Math.pow(10, digits);
  return Math.round(value * factor * 100) / factor;
}
