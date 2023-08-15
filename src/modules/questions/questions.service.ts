import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
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

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: PaginateModel<Question>,
  ) {}
  create(createQuestionDto: CreateQuestionDto) {
    const createQuestion = new this.questionModel(createQuestionDto);
    return createQuestion.save();
  }

  async findAll(pagination: FilterQuestiontDto) {
    const options = paginationQuery(pagination.page, pagination.page_size, [
      {
        path: 'question_sup.question_meta.image_sup',
        select: '-deleted_at -createdAt -updatedAt',
      },
      {
        path: 'question_sup.answer_correct.image_sup',
        select: '-deleted_at -createdAt -updatedAt',
      },
      {
        path: 'question_sup.answer_system.image_sup',
        select: '-deleted_at -createdAt -updatedAt',
      },
      {
        path: 'question_sup.answer_check.image_sup',
        select: '-deleted_at -createdAt -updatedAt',
      },
    ]);
    const filters = queryFilters(pagination);
    const questions = await this.questionModel.paginate(filters, options);
    return questions;
  }

  async findOne(id: number) {
    try {
      const question = await this.questionModel
        .findOne({ id })
        .populate({
          path: 'question_sup.question_meta.image_sup',
          select: '-deleted_at -createdAt -updatedAt',
        })
        .populate({
          path: 'question_sup.answer_correct.image_sup',
          select: '-deleted_at -createdAt -updatedAt',
        })
        .populate({
          path: 'question_sup.answer_system.image_sup',
          select: '-deleted_at -createdAt -updatedAt',
        })
        .populate({
          path: 'question_sup.answer_check.image_sup',
          select: '-deleted_at -createdAt -updatedAt',
        })
        .exec();
      return {
        data: question,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  async remove(id: number) {
    const account = await this.questionModel.findOne({ id }).exec();
    if (!account) {
      throw new NotFoundException(`${id} not Found`);
    }
    await this.questionModel
      .findOneAndUpdate({ id: id }, { deleted_at: Date.now() })
      .exec();
    throw new HttpException('Delete sucess', HttpStatus.OK);
  }
}
