/* eslint-disable */
export const colors = {
  light: '#ffffff',
  dark: '#151A25',
  pink: '#151A25',
  green: '#71F6CD',
  blue: '#383E76',
  blue_70: '#1E6EFA',
  paleBlue_05: '#e2f2ff',
};
/* eslint-enable */

export const light = {
  background: colors.light,
  backgroundPaper: colors.light,
  primary: '#A750B9',
  font: colors.dark,
  fontInverse: colors.light,
  focused: '#383E76',
  headerFont: colors.light,
  placeholder: '#676c7a',
  link: colors.blue_70,
};
export type Theme = typeof light;
export const dark = {
  background: colors.dark,
  backgroundPaper: colors.dark,
  primary: '#71F6CD', // '#383E76',
  font: colors.light,
  fontInverse: colors.dark,
  focused: colors.light,
  headerFont: colors.light,
  placeholder: '#8f94a3',
  link: colors.paleBlue_05,
};
