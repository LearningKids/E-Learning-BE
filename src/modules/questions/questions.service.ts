import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import baseException from 'src/helpers/baseException';
import methodBase from 'src/helpers/methodBase';
import paginationQuery from 'src/pagination';
import queryFilters from 'src/pagination/filters';
import { QuestionMetaService } from '../question_meta/question_meta.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { FilterQuestiontDto } from './dto/filter-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import * as lodash from 'lodash';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: PaginateModel<Question>,
    private questionMetaService: QuestionMetaService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto, author: number) {
    const question_meta = [];
    for (const element of createQuestionDto.question_meta) {
      const meta = await this.questionMetaService.create(element);
      question_meta.push(meta._id);
    }
    const dataQuestion = {
      question_name: createQuestionDto.question_name,
      question_type: createQuestionDto.question_type,
      question_description: createQuestionDto.question_description,
      author,
      question_meta,
      subject: createQuestionDto.subject,
    };

    const createQuestion = new this.questionModel(dataQuestion);
    return createQuestion.save();
  }

  async findAll(pagination: FilterQuestiontDto, authorID: number) {
    const options = paginationQuery(pagination.page, pagination.page_size, [
      'question_meta',
      'author',
    ]);
    let data = {};
    let filters = {};
    if (String(pagination?.personal) === 'true') {
      delete pagination.personal;
      data = {
        ...pagination,
        author: Number(authorID),
        subject: Number(pagination.subject),
      };
      filters = queryFilters(data);
    } else {
      delete pagination.personal;
      filters = queryFilters({
        ...pagination,
        subject: Number(pagination.subject),
      });
    }
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
        baseException.NotFound(`question id ${_id}`);
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
        baseException.NotFound(`question id ${_id}`);
      }
      const questionUpdate = lodash.map(updateQuestionDto.question_meta, 'id');
      const differentQuestion = lodash.difference(
        question.question_meta,
        questionUpdate,
      );
      if (differentQuestion.length > 0) {
        differentQuestion.map(async (question) => {
          await this.questionMetaService.remove(question);
        });
      }
      const arrayMeta = [];
      for (const element of updateQuestionDto.question_meta) {
        if (question.question_meta.includes(element.id)) {
          arrayMeta.push(element.id);
          await this.questionMetaService.update(element.id, element);
        } else {
          const qs_metaNew = await this.questionMetaService.create(element);
          arrayMeta.push(qs_metaNew._id);
        }
      }
      await methodBase.findOneUpdate({ _id }, this.questionModel, {
        question_name: updateQuestionDto.question_name,
        question_type: updateQuestionDto.question_type,
        question_description: updateQuestionDto.question_description,
        question_meta: arrayMeta,
        subject: updateQuestionDto.subject,
      });

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
