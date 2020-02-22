/* eslint-disable */
export const colors = {
  light: '#ffffff',
  dark: '#151A25',
  pink: '#151A25',
  green: '#71F6CD',
  blue: '#383E76',
};
/* eslint-enable */

export const light = {
  background: colors.green,
  backgroundPager: colors.light,
  primary: '#71F6CD', // '#383E76',
  fontColor: colors.dark,
  focused: '#383E76',
  headerFont: colors.light,
  placeholder: '#676c7a',
};
export type Theme = typeof light;
export const dark = {
  background: colors.dark,
  backgroundPaper: colors.dark,
  primary: '#A750B9',
  fontColor: colors.light,
  focused: colors.light,
  headerFont: colors.light,
  placeholder: '#8f94a3',
};
