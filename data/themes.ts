import { THEMES } from "~types";

export const THEME_COLORS = {
  [THEMES.DARK]: {
    background: {
      a: 1,
      b: 17,
      g: 9,
      r: 11,
    },
    line: {
      a: 1,
      b: 53,
      g: 48,
      r: 48,
    },
    text: {
      a: 0.7,
      b: 255,
      g: 255,
      r: 255,
    },
    accent: {
      a: 1,
      b: 239,
      g: 153,
      r: 85,
    },
  },
  [THEMES.ROSE_GOLD]: {
    background: {
      a: 1,
      b: 146,
      g: 133,
      r: 206,
    },
    line: {
      a: 1,
      b: 165,
      g: 164,
      r: 217,
    },
    text: {
      a: 0.7,
      b: 230,
      g: 237,
      r: 242,
    },
    accent: {
      a: 1,
      b: 77,
      g: 46,
      r: 152,
    },
  },
  [THEMES.OCEAN_WAVE]: {
    background: {
      a: 1,
      b: 92,
      g: 52,
      r: 27,
    },
    line: {
      a: 1,
      b: 127,
      g: 96,
      r: 79,
    },
    text: {
      a: 0.7,
      b: 218,
      g: 233,
      r: 238,
    },
    accent: {
      a: 1,
      b: 179,
      g: 163,
      r: 68,
    },
  },
};

export const EMPTY_THEME_COLORS = {
  r: null,
  g: null,
  b: null,
  a: null,
};
