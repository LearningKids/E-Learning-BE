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

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: PaginateModel<Course>,
  ) {}
  //! create
  create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createCourse = new this.courseModel(createCourseDto);
    return createCourse.save();
  }
  //! all
  async findAll(pagination: FilterCourseDto) {
    const options = paginationQuery(pagination.page, pagination.page_size, [
      'content_lesson',
    ]);
    const filters = queryFilters(pagination);
    const courses = await this.courseModel.paginate(filters, options);
    return courses;
  }

  //! detail
  async findOne(id: number) {
    try {
      const course = await this.courseModel
        .findOne({ id })
        .populate('content_lesson')
        .exec();
      return {
        data: course,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(id: number) {
    const course = await this.courseModel.findOne({ id }).exec();
    if (!course) {
      throw new NotFoundException(`${id} not Found`);
    }
    await this.courseModel
      .findOneAndUpdate({ id: id }, { deleted_at: Date.now() })
      .exec();
    throw new HttpException('Delete sucess', HttpStatus.OK);
  }
}
