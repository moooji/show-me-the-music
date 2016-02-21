'use strict';

export function keyToString(key, mode) {
  const major = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const minor = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
  return mode === 1 ? major[key] : minor[key];
}

export function moodToString(energy, valence) {
  if (energy > 0.5 && valence > 0.5) {
    return 'Delighted';
  } else if (energy > 0.5 && valence <= 0.5) {
    return 'Angry';
  } else if (energy <= 0.5 && valence <= 0.5) {
    return 'Melancholic';
  } else {
    return 'Calm';
  }
}

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
