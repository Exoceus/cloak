import { COLOR_TOPIC, THEME } from "~enums";

export const THEME_COLORS = {
  [THEME.DARK]: {
    [COLOR_TOPIC.BACKGROUND]: {
      a: 1,
      b: 17,
      g: 9,
      r: 11,
    },
    [COLOR_TOPIC.LINE]: {
      a: 1,
      b: 53,
      g: 48,
      r: 48,
    },
    [COLOR_TOPIC.TEXT]: {
      a: 0.7,
      b: 255,
      g: 255,
      r: 255,
    },
    [COLOR_TOPIC.ACCENT]: {
      a: 1,
      b: 239,
      g: 153,
      r: 85,
    },
  },
  [THEME.ROSE_GOLD]: {
    [COLOR_TOPIC.BACKGROUND]: {
      a: 1,
      b: 146,
      g: 133,
      r: 206,
    },
    [COLOR_TOPIC.LINE]: {
      a: 1,
      b: 165,
      g: 164,
      r: 217,
    },
    [COLOR_TOPIC.TEXT]: {
      a: 0.7,
      b: 230,
      g: 237,
      r: 242,
    },
    [COLOR_TOPIC.ACCENT]: {
      a: 1,
      b: 77,
      g: 46,
      r: 152,
    },
  },
  [THEME.OCEAN_WAVE]: {
    [COLOR_TOPIC.BACKGROUND]: {
      a: 1,
      b: 92,
      g: 52,
      r: 27,
    },
    [COLOR_TOPIC.LINE]: {
      a: 1,
      b: 127,
      g: 96,
      r: 79,
    },
    [COLOR_TOPIC.TEXT]: {
      a: 0.7,
      b: 218,
      g: 233,
      r: 238,
    },
    [COLOR_TOPIC.ACCENT]: {
      a: 1,
      b: 179,
      g: 163,
      r: 68,
    },
  },
};

export const EMPTY_THEME_COLOR = {
  r: null,
  g: null,
  b: null,
  a: null,
};
