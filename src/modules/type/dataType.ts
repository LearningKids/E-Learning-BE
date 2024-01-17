export interface ISelect {
  label: string;
  value: number;
  type?: 'math' | 'english';
}
export const IMAGESUP_TYPE: ISelect[] = [
  { label: 'Khác', value: 1 },
  { label: 'Quả', value: 2 },
  { label: 'Động vật', value: 3 },
];

export const QUESTION_TYPE: ISelect[] = [
  { label: 'Completion(Hoàn thành câu)', value: 1, type: 'math' },
  { label: 'Compare(So sánh)', value: 2, type: 'math' },
  { label: 'Calculate(Đặt phép tính)', value: 3, type: 'math' },
  { label: 'Word math(Toán lời văn)', value: 5, type: 'math' },

  { label: 'True/False/Not Given', value: 6, type: 'english' },
  // { label: 'Matching Heading/Feature', value: 7, type: 'english' },s
  { label: 'Sentence Completion', value: 8, type: 'english' },
  { label: 'Summary Completion', value: 9, type: 'english' },
  { label: 'Multiple Choice', value: 10, type: 'english' },
];

export const EXCERCISE_TYPE: ISelect[] = [
  { label: 'Bài thi', value: 1 },
  { label: 'Bài tập về nhà', value: 2 },
  // { label: 'Học thử', value: 3 },
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
  { label: 'Miễn phí', value: 1 },
  { label: 'Trả phí', value: 2 },
];
