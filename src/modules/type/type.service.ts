import { Injectable } from '@nestjs/common';
import { QUESTION_TYPE, IMAGESUP_TYPE } from './dataType';
import { Types } from './type.dto';

@Injectable()
export class TypeService {
  private QuestionType = QUESTION_TYPE;
  private ImageType = IMAGESUP_TYPE;

  findAll(type: string) {
    if (type === Types.Question) {
      return this.QuestionType;
    }
    if (type === Types.ImageSup) {
      return this.ImageType;
    }
  }
}
