import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from './entities/lesson.entity';
import { PaginateModel } from 'mongoose';
import { FilterLessontDto } from './dto/filter-lesson.dto';
import paginationQuery from 'src/pagination';
import queryFilters from 'src/pagination/filters';
import { ExcercisesService } from '../exercises/excercises.service';
import baseException from 'src/helpers/baseException';
import methodBase from 'src/helpers/methodBase';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name)
    private readonly lessonModel: PaginateModel<Lesson>,
    private exerciseService: ExcercisesService,
  ) {}
  //!create
  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    try {
      // for (const idExercise of createLessonDto.exercises) {
      //   await this.exerciseService.findOne(idExercise);
      // }
      const createLesson = new this.lessonModel(createLessonDto);
      return createLesson.save();
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  //! all
  async findAll(pagination: FilterLessontDto) {
    const options = paginationQuery(pagination.page, pagination.page_size, []);
    const filters = queryFilters(pagination);
    const lessons = await this.lessonModel.paginate(filters, options);
    return lessons;
  }
  //! detail
  async findOne(_id: number) {
    try {
      const options = [];
      const lesson = await methodBase.findOneByCondition(
        { _id },
        this.lessonModel,
        options,
      );
      if (!lesson) {
        baseException.NotFound(`lesson id ${_id}`);
      }
      return lesson;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  //! update
  async update(_id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    try {
      // for (const idExercise of updateLessonDto.exercises) {
      //   await this.exerciseService.findOne(idExercise);
      // }
      const lessonUpdate = await methodBase.findOneUpdate(
        { _id },
        this.lessonModel,
        updateLessonDto,
      );
      if (!lessonUpdate) {
        baseException.NotFound(`lesson id ${_id}`);
      }
      return lessonUpdate;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  //!remove
  async remove(_id: number) {
    try {
      const lessonRemove = await methodBase.remove({ _id }, this.lessonModel);
      if (!lessonRemove) {
        baseException.NotFound(`lesson id ${_id}`);
      }
      throw new HttpException('Delete sucess', HttpStatus.OK);
    } catch (error) {
      baseException.HttpException(error);
    }
  }
}
