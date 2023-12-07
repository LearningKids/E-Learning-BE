export interface ISelect {
  label: string;
  value: number;
}
export const IMAGESUP_TYPE: ISelect[] = [
  { label: 'Khác', value: 1 },
  { label: 'Quả', value: 2 },
  { label: 'Động vật', value: 3 },
];

export const QUESTION_TYPE: ISelect[] = [
  { label: 'Completion', value: 1 },
  { label: 'Compare', value: 2 },
];

export const EXCERCISE_TYPE: ISelect[] = [
  { label: 'Bài thi', value: 1 },
  { label: 'Bài tập về nhà', value: 2 },
  { label: 'Học thử', value: 3 },
];

export const SUBJECT: ISelect[] = [
  { label: 'Toán', value: 1 },
  { label: 'Tiếng anh', value: 2 },
];

export const LESSON_TYPE: ISelect[] = [
  { label: 'Mặc định', value: 1 },
  {
    label: 'Trả phí',
    value: 2,
  },
];

export const COURSE_TYPE: ISelect[] = [
  { label: 'Trial', value: 1 },
  { label: 'Trả phí', value: 2 },
];

export const CLASS_STATUS: ISelect[] = [
  { label: 'Sắp khải giảng', value: 1 },
  { label: 'Đang học', value: 2 },
  { label: 'Kết thúc', value: 3 },
];

export const CLASS_TYPE: ISelect[] = [
  { label: 'Online', value: 1 },
  { label: 'Offline', value: 2 },
];
