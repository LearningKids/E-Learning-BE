import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuestionMeta } from './entities/question_meta.entity';
import { Model, PaginateModel } from 'mongoose';
import { Question } from '../questions/entities/question.entity';
import { QuestionMetaDTO } from '../questions/dto/create-question.dto';
import methodBase from 'src/helpers/methodBase';
import { UpdateQuestionMetaDTO } from '../questions/dto/update-question.dto';
import baseException from 'src/helpers/baseException';

@Injectable()
export class QuestionMetaService {
  constructor(
    @InjectModel(QuestionMeta.name)
    private readonly questionMetaModel: PaginateModel<Question>,
  ) {}

  create(createQuestionMetaDto: QuestionMetaDTO) {
    const createQuestion = new this.questionMetaModel(createQuestionMetaDto);
    return createQuestion.save();
  }

  async findOne(_id: number) {
    try {
      const question_meta = await methodBase.findOneByCondition(
        { _id },
        this.questionMetaModel,
      );
      if (!question_meta) {
        baseException.NotFound(_id);
      }
      return question_meta;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async update(_id: number, updateQuestionMetaDTO: UpdateQuestionMetaDTO) {
    try {
      const questionMetaUpdate = await methodBase.findOneUpdate(
        { _id },
        this.questionMetaModel,
        updateQuestionMetaDTO,
      );
      if (!questionMetaUpdate) {
        baseException.NotFound(_id);
      }
      return questionMetaUpdate;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async remove(_id: number) {
    try {
      const questionMetaDelete = await this.questionMetaModel
        .findOneAndUpdate({ _id: _id }, { deleted_at: Date.now() })
        .exec();
      if (!questionMetaDelete) {
        baseException.NotFound(_id);
      }
      return questionMetaDelete;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
}
