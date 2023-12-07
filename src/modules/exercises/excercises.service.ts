import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import baseException from 'src/helpers/baseException';
import methodBase from 'src/helpers/methodBase';
import paginationQuery from 'src/pagination';
import queryFilters from 'src/pagination/filters';
import { QuestionsService } from '../questions/questions.service';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { FilterExerciseDto } from './dto/filter-exercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { Exercise } from './entities/excercise.entity';

@Injectable()
export class ExcercisesService {
  constructor(
    @InjectModel(Exercise.name)
    private readonly exerciseModel: PaginateModel<Exercise>,
    private questionService: QuestionsService,
  ) {}

  async create(createExcerciseDto: CreateExcerciseDto): Promise<Exercise> {
    try {
      for (const question of createExcerciseDto.questions) {
        await this.questionService.findOne(question);
      }
      const createExercise = new this.exerciseModel(createExcerciseDto);
      return createExercise.save();
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async findAll(pagination: FilterExerciseDto, authorID: number) {
    try {
      const options = paginationQuery(pagination.page, pagination.page_size, [
        { path: 'author', select: '-deleted_at -createdAt -updatedAt' },
        {
          path: 'questions',
          select: '-deleted_at -createdAt -updatedAt',
        },
      ]);
      let data = {};
      let filters = {};
      if (String(pagination.personal) === 'true') {
        delete pagination.personal;
        data = { ...pagination, author: Number(authorID) };
        filters = queryFilters(data);
      } else {
        delete pagination.personal;
        filters = queryFilters(pagination);
      }
      const exercises = await this.exerciseModel.paginate(filters, options);
      return exercises;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async findOne(_id: number) {
    try {
      const options = [
        { path: 'author', select: '-deleted_at -createdAt -updatedAt' },
        {
          path: 'questions',
          select: '-deleted_at -createdAt -updatedAt',
          populate: {
            path: 'author',
            select: '-deleted_at -createdAt -updatedAt',
          },
        },
        {
          path: 'questions',
          populate: {
            path: 'question_meta',
            select: '-deleted_at -createdAt -updatedAt',
          },
        },
      ];
      const exercise = await methodBase.findOneByCondition(
        { _id },
        this.exerciseModel,
        options,
      );
      if (!exercise) {
        baseException.NotFound(`exercise id ${_id}`);
      }
      return exercise;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  //! update
  async update(_id: number, updateExcerciseDto: UpdateExcerciseDto) {
    try {
      const exerciseUpdate = await methodBase.findOneUpdate(
        { _id },
        this.exerciseModel,
        updateExcerciseDto,
      );
      if (!exerciseUpdate) {
        baseException.NotFound(`exercise id ${_id}`);
      }
      return exerciseUpdate;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  //! remove
  async remove(_id: number) {
    try {
      const exerciseRemove = await methodBase.remove(
        { _id },
        this.exerciseModel,
      );
      if (!exerciseRemove) {
        baseException.NotFound(`exercise id ${_id}`);
      }
      throw new HttpException('Delete sucess', HttpStatus.OK);
    } catch (error) {
      baseException.HttpException(error);
    }
  }
}
