import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from './entities/class.entity';
import { PaginateModel } from 'mongoose';
import { FilterClassDto } from './dto/filter-class.dto';
import paginationQuery from 'src/pagination';
import queryFilters from 'src/pagination/filters';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name)
    private readonly classModel: PaginateModel<Class>,
  ) {}

  create(createClassDto: CreateClassDto) {
    try {
      const createClass = new this.classModel(createClassDto);
      return createClass.save();
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
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
      {
        path: 'exercises',
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
      const course = await this.classModel
        .findById({ _id })
        .populate([
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
          {
            path: 'exercises',
            select: '-deleted_at -createdAt -updatedAt',
          },
        ])
        .exec();
      return {
        data: course,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async update(_id: number, updateClassDto: UpdateClassDto) {
    try {
      const clas = await this.classModel.findById({ _id }).exec();
      if (!clas) {
        throw new NotFoundException(`${_id} not Found`);
      }
      const classUpdate = await this.classModel
        .findOneAndUpdate({ _id: _id }, updateClassDto, { new: true })
        .exec();
      return classUpdate;
    } catch (error) {
      throw new HttpException(`Error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(_id: number) {
    const classRemove = await this.classModel.findById({ _id }).exec();
    if (!classRemove) {
      throw new NotFoundException(`${_id} not Found`);
    }
    await this.classModel
      .findOneAndUpdate({ _id: _id }, { deleted_at: Date.now() })
      .exec();
    throw new HttpException('Delete sucess', HttpStatus.OK);
  }
}
