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
