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
  other = 'other',
  fruit = 'fruit',
}
export enum COURSE_TYPE {
  trial = 'TRIAL',
  charged = 'CHARGED',
}
export enum SUBJECT {
  Math = 'MATH',
  English = 'ENGLISH',
}
