export const URL_SWAGGER = 'swagger/api';

export const roleNames = {
  admin: 'ADMIN',
  teacher: 'TEACHER',
  student: 'STUDENT',
  student_trial: 'STUDENT_TRIAl',
};

export enum LESSON_TYPE {
  default_lesson = 'DEFEAULT_LESSON', //!  lesson default belongsTo course
  created_lesson = 'CREATE_LESSON', //! lesson created by admin or teacher
}
export enum IMAGESUP_TYPE {
  other = 1,
  fruit = 2,
  animal = 3,
}
export enum COURSE_TYPE {
  trial = 'TRIAL',
  charged = 'CHARGED',
}
export enum SUBJECT {
  Math = 'MATH',
  English = 'ENGLISH',
}

export enum QUESTION_TYPE_ENTITY {
  compare = 'compare',
  completion = 'completion',
}
export enum EXCERCISE_TYPE_ENTITY {
  test = 'Test',
  homework = 'Homework',
  trial_learning = 'Trial',
}

export enum CLASS_STATUS {
  prepare = 'PREPARE',
  running = 'RUNNING',
  finished = 'FINISHED',
}

export enum CLASS_TYPES {
  online = 'ONLINE',
  offline = 'OFFLINE',
}
