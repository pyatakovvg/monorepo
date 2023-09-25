export const icons = [
  'spinner',
  'calendar-days',
  'check',
  'xmark',
  'exclamation',
  'circle-exclamation',
  'lightbulb',
  'chevron-right',
  'chevron-left',
  'chevron-up',
  'chevron-down',
] as const;
export type IIcon = (typeof icons)[number];

export const weights = ['solid', 'regular'];
export type IWeight = (typeof weights)[number];
