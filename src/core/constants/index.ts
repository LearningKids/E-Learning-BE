export const URL_SWAGGER = 'swagger/api';

export const roleNames = {
  admin: 'ADMIN',
  teacher: 'TEACHER',
  student: 'STUDENT',
  student_trial: 'STUDENT_TRIAl',
};

export enum LESSON_TYPE_ENTITY {
  default_lesson = 1, //!  lesson default belongsTo course
  created_lesson = 2, //! lesson created by admin or teacher
}
export enum IMAGESUP_TYPE {
  other = 1,
  fruit = 2,
  animal = 3,
}
export enum COURSE_TYPE_ENTITY {
  trial = 1,
  charged = 2,
}
export enum SUBJECT_ENTITY {
  Math = 1,
  English = 2,
}

export enum QUESTION_TYPE_ENTITY {
  completion = 1,
  compare = 2,
  calculate = 3,
  numeration = 4,
  word_math = 5,
  t_f_ng = 6,
  matching = 7,
  sentence_completion = 8,
  word_arrangement = 9,
  one_choice = 10,
}
export enum EXCERCISE_TYPE_ENTITY {
  test = 1,
  homework = 2,
  trial_learning = 3,
}

export enum CLASS_STATUS {
  prepare = 1,
  running = 2,
  finished = 3,
}

export enum CLASS_TYPES {
  online = 1,
  offline = 2,
}

export const DayofWeek = [
  { label: 'Chủ Nhật', value: '0' },
  { label: 'Thứ Hai', value: '1' },
  { label: 'Thứ Ba', value: '2' },
  { label: 'Thứ Tư', value: '3' },
  { label: 'Thứ Năm', value: '4' },
  { label: 'Thứ Sáu', value: '5' },
  { label: 'Thứ Bảy', value: '6' },
];

export enum status_exercise_student {
  unfinished = 1,
  done = 2,
  cando = 3,
}
