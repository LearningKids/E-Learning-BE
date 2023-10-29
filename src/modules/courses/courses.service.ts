import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './entities/course.entity';
import { PaginateModel } from 'mongoose';
import { FilterCourseDto } from './dto/filter-course.dto';
import paginationQuery from 'src/pagination';
import queryFilters from 'src/pagination/filters';
import baseException from 'src/helpers/baseException';
import { LessonsService } from '../lessons/lessons.service';
import methodBase from 'src/helpers/methodBase';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: PaginateModel<Course>,
    private readonly lessonServices: LessonsService,
  ) {}
  //! create
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      for (const lesson of createCourseDto.content_lesson) {
        await this.lessonServices.findOne(lesson);
      }
      const createCourse = new this.courseModel(createCourseDto);
      return createCourse.save();
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  //! all
  async findAll(pagination: FilterCourseDto) {
    try {
      const options = paginationQuery(pagination.page, pagination.page_size, [
        {
          path: 'content_lesson',
          select: '-deleted_at -createdAt -updatedAt',
          populate: {
            path: 'exercises',
            select: '-deleted_at -createdAt -updatedAt',
            populate: {
              path: 'questions',
              select: '-deleted_at -createdAt -updatedAt',
              populate: {
                path: 'question_meta',
                select: '-deleted_at -createdAt -updatedAt',
              },
            },
          },
        },
      ]);
      const filters = queryFilters(pagination);
      const courses = await this.courseModel.paginate(filters, options);
      return courses;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  //! detail
  async findOne(_id: number) {
    try {
      const options = [
        {
          path: 'content_lesson',
          select: '-deleted_at -createdAt -updatedAt',
          populate: {
            path: 'exercises',
            select: '-deleted_at -createdAt -updatedAt',
            populate: {
              path: 'questions',
              select: '-deleted_at -createdAt -updatedAt',
              populate: {
                path: 'question_meta',
                select: '-deleted_at -createdAt -updatedAt',
              },
            },
          },
        },
      ];
      const course = await methodBase.findOneByCondition(
        { _id },
        this.courseModel,
        options,
      );
      if (!course) {
        baseException.NotFound(`course id ${_id}`);
      }
      return course;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  //! update
  async update(_id: number, updateCourseDto: UpdateCourseDto) {
    try {
      for (const lesson of updateCourseDto.content_lesson) {
        await this.lessonServices.findOne(lesson);
      }
      const courseUpdate = await methodBase.findOneUpdate(
        { _id },
        this.courseModel,
        updateCourseDto,
      );
      if (!courseUpdate) {
        baseException.NotFound(`course id ${_id}`);
      }
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async remove(_id: number) {
    try {
      const course = await methodBase.remove({ _id }, this.courseModel);
      if (!course) {
        baseException.NotFound(`course id ${_id}`);
      }
      throw new HttpException('Delete sucess', HttpStatus.OK);
    } catch (error) {
      baseException.HttpException(error);
    }
  }
}
