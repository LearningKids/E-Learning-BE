import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Question } from './entities/question.entity';
import { FilterQuestiontDto } from './dto/filter-question.dto';
import paginationQuery from 'src/pagination';
import queryFilters from 'src/pagination/filters';
import { QuestionMetaService } from '../question_meta/question_meta.service';
import methodBase from 'src/helpers/methodBase';
import baseException from 'src/helpers/baseException';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: PaginateModel<Question>,
    private questionMetaService: QuestionMetaService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const question_meta = [];
    for (const element of createQuestionDto.question_meta) {
      const meta = await this.questionMetaService.create(element);
      question_meta.push(meta._id);
    }
    const dataQuestion = {
      question_name: createQuestionDto.question_name,
      question_type: createQuestionDto.question_type,
      question_meta,
    };

    const createQuestion = new this.questionModel(dataQuestion);
    return createQuestion.save();
  }

  async findAll(pagination: FilterQuestiontDto) {
    const options = paginationQuery(pagination.page, pagination.page_size, [
      'question_meta',
    ]);
    const filters = queryFilters(pagination);
    const questions = await this.questionModel.paginate(filters, options);
    return questions;
  }

  async findOne(_id: number) {
    try {
      const question = await methodBase.findOneByCondition(
        { _id },
        this.questionModel,
        ['question_meta'],
      );
      if (!question) {
        baseException.NotFound(_id);
      }
      return {
        data: question,
        status: 200,
      };
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async update(_id: number, updateQuestionDto: UpdateQuestionDto) {
    try {
      const question = await methodBase.findOneByCondition(
        { _id },
        this.questionModel,
      );
      if (!question) {
        baseException.NotFound(_id);
      }
      for (const element of updateQuestionDto.question_meta) {
        if (question.question_meta.includes(element.id)) {
          await this.questionMetaService.update(element.id, element);
        } else {
          throw new NotFoundException(
            `question_meta id_${element.id} don't fk`,
          );
        }
      }
      return this.findOne(_id);
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async remove(_id: number) {
    try {
      const question = await methodBase.remove({ _id }, this.questionModel);
      if (!question) {
        baseException.NotFound(_id);
      }
      throw new HttpException('Delete sucess', HttpStatus.OK);
    } catch (error) {
      baseException.HttpException(error);
    }
  }
}
