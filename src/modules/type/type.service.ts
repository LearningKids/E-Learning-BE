import { Injectable } from '@nestjs/common';
import {
  QUESTION_TYPE,
  IMAGESUP_TYPE,
  EXCERCISE_TYPE,
  SUBJECT,
  LESSON_TYPE,
  COURSE_TYPE,
} from './dataType';
import { Types } from './type.dto';

@Injectable()
export class TypeService {
  private QuestionType = QUESTION_TYPE;
  private ImageType = IMAGESUP_TYPE;
  private ExerciseType = EXCERCISE_TYPE;
  private Subject = SUBJECT;
  private LessonType = LESSON_TYPE;
  private CourseType = COURSE_TYPE;

  findAll(type: string) {
    if (type === Types.Question) {
      return this.QuestionType;
    }
    if (type === Types.ImageSup) {
      return this.ImageType;
    }
    if (type === Types.Exercise) {
      return this.ExerciseType;
    }
    if (type === Types.Subject) {
      return this.Subject;
    }
    if (type === Types.Lesson) {
      return this.LessonType;
    }
    if (type === Types.Course) {
      return this.CourseType;
    }
  }
}
