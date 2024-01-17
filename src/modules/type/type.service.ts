import { Injectable } from '@nestjs/common';
import {
  QUESTION_TYPE,
  IMAGESUP_TYPE,
  EXCERCISE_TYPE,
  SUBJECT,
  LESSON_TYPE,
  COURSE_TYPE,
  CLASS_TYPE,
  CLASS_STATUS,
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
  private ClassType = CLASS_TYPE;
  private Class_Status = CLASS_STATUS;

  findAll(type: string, subject: string) {
    switch (type) {
      case Types.Question: {
        if (subject) {
          return this.QuestionType.filter((item) => item.type === subject).map(
            ({ type, ...rest }) => rest,
          );
        } else {
          return this.QuestionType.map(({ type, ...rest }) => rest);
        }
      }

      case Types.ImageSup:
        return this.ImageType;
      case Types.Exercise:
        return this.ExerciseType;
      case Types.Subject:
        return this.Subject;
      case Types.Lesson:
        return this.LessonType;
      case Types.Course:
        return this.CourseType;
      case Types.Class:
        return this.ClassType;
      case Types.Class_Status:
        return this.Class_Status;
    }
  }
}
