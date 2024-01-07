export type Query = Record<string, string>;

export enum TaskType {
  infinite,
  cumulative,
  crescent,
}

export enum TaskFrequency {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
}
