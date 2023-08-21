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
    console.log(pagination);
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
  async findOne(id: number) {
    try {
      const course = await this.classModel
        .findOne({ id })
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

  async update(id: number, updateClassDto: UpdateClassDto) {
    try {
      const clas = await this.classModel.findOne({ id }).exec();
      if (!clas) {
        throw new NotFoundException(`${id} not Found`);
      }
      const classUpdate = await this.classModel
        .findOneAndUpdate({ id: id }, updateClassDto, { new: true })
        .exec();
      return classUpdate;
    } catch (error) {
      throw new HttpException(`Error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const classRemove = await this.classModel.findOne({ id }).exec();
    if (!classRemove) {
      throw new NotFoundException(`${id} not Found`);
    }
    await this.classModel
      .findOneAndUpdate({ id: id }, { deleted_at: Date.now() })
      .exec();
    throw new HttpException('Delete sucess', HttpStatus.OK);
  }
}
