export interface ISelect {
  label: string;
  value: number;
}
export const IMAGESUP_TYPE: ISelect[] = [
  { label: 'Other', value: 1 },
  { label: 'Fruit', value: 2 },
  { label: 'Animal', value: 3 },
];

export const QUESTION_TYPE: ISelect[] = [
  { label: 'Compare', value: 1 },
  { label: 'Completion', value: 2 },
];

export const EXCERCISE_TYPE: ISelect[] = [
  { label: 'Test', value: 1 },
  { label: 'HomeWork', value: 2 },
  { label: 'Trial', value: 3 },
];
