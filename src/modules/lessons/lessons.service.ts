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

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name)
    private readonly lessonModel: PaginateModel<Lesson>,
  ) {}
  //!create
  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const createLesson = new this.lessonModel(createLessonDto);
    return createLesson.save();
  }
  //! all
  async findAll(pagination: FilterLessontDto) {
    const options = paginationQuery(pagination.page, pagination.page_size);
    const filters = queryFilters(pagination);
    const lessons = await this.lessonModel.paginate(filters, options);
    return lessons;
  }
  //! detail
  async findOne(id: number) {
    try {
      const lesson = await this.lessonModel.findOne({ id }).exec();
      return {
        data: lesson,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }
  //! update
  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    try {
      const account = await this.lessonModel.findOne({ id }).exec();
      if (!account) {
        throw new NotFoundException(`${id} not Found`);
      }
      const accountUpdate = await this.lessonModel
        .findOneAndUpdate({ id: id }, updateLessonDto, { new: true })
        .exec();
      return accountUpdate;
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }
  //!remove
  async remove(id: number) {
    const account = await this.lessonModel.findOne({ id }).exec();
    if (!account) {
      throw new NotFoundException(`${id} not Found`);
    }
    await this.lessonModel
      .findOneAndUpdate({ id: id }, { deleted_at: Date.now() })
      .exec();
    throw new HttpException('Delete sucess', HttpStatus.OK);
  }
}
