import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import baseException from 'src/helpers/baseException';
import methodBase from 'src/helpers/methodBase';
import paginationQuery from 'src/pagination';
import queryFilters from 'src/pagination/filters';
import { AccountsService } from '../accounts/accounts.service';
import { CoursesService } from '../courses/courses.service';
import { CreateClassDto } from './dto/create-class.dto';
import { FilterClassDto } from './dto/filter-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name)
    private readonly classModel: PaginateModel<Class>,
    private accountService: AccountsService,
    private courseService: CoursesService,
  ) {}

  async create(createClassDto: CreateClassDto) {
    try {
      for (const student of createClassDto.students) {
        await this.accountService.findOne(student);
      }
      await this.accountService.findOne(createClassDto.teacher);
      await this.courseService.findOne(createClassDto.course);
      const createClass = new this.classModel(createClassDto);
      return createClass.save();
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  //! all
  async findAll(pagination: FilterClassDto) {
    const options = paginationQuery(pagination.page, pagination.page_size, [
      {
        path: 'teacher',
        select: '-deleted_at -createdAt -updatedAt',
      },
      {
        path: 'students',
        select: '-deleted_at -createdAt -updatedAt',
      },
      {
        path: 'course',
        select: '-deleted_at -createdAt -updatedAt',
      },
    ]);
    const filters = queryFilters(pagination);
    const listClass = await this.classModel.paginate(filters, options);
    return listClass;
  }

  //! detail
  async findOne(_id: number) {
    try {
      const options = [
        {
          path: 'teacher',
          select: '-deleted_at -createdAt -updatedAt',
        },
        {
          path: 'students',
          select: '-deleted_at -createdAt -updatedAt',
        },
        {
          path: 'course',
          select: '-deleted_at -createdAt -updatedAt',
        },
      ];
      const course = await methodBase.findOneByCondition(
        { _id },
        this.classModel,
        options,
      );
      if (!course) {
        baseException.NotFound(`course id ${_id}`);
      }
      return {
        data: course,
        status: 200,
      };
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async update(_id: number, updateClassDto: UpdateClassDto) {
    try {
      for (const student of updateClassDto.students) {
        await this.accountService.findOne(student);
      }
      await this.accountService.findOne(updateClassDto.teacher);
      await this.courseService.findOne(updateClassDto.course);
      const exerciseUpdate = await methodBase.findOneUpdate(
        { _id },
        this.classModel,
        updateClassDto,
      );
      if (!exerciseUpdate) {
        baseException.NotFound(`exercise id ${_id}`);
      }
      return exerciseUpdate;
    } catch (error) {
      console.log(error);
      baseException.HttpException(error);
    }
  }

  async remove(_id: number) {
    try {
      const classRemove = await methodBase.remove({ _id }, this.classModel);
      if (!classRemove) {
        baseException.NotFound(`class id ${_id}`);
      }
      throw new HttpException('Delete sucess', HttpStatus.OK);
    } catch (error) {
      baseException.HttpException(error);
    }
  }
}
