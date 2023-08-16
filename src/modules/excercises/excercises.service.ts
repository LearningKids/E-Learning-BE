import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Excercise } from './entities/excercise.entity';
import { PaginateModel } from 'mongoose';
import { FilterExerciseDto } from './dto/filter-exercise.dto';
import paginationQuery from 'src/pagination';
import queryFilters from 'src/pagination/filters';

@Injectable()
export class ExcercisesService {
  constructor(
    @InjectModel(Excercise.name)
    private readonly exerciseModel: PaginateModel<Excercise>,
  ) {}

  create(createExcerciseDto: CreateExcerciseDto): Promise<Excercise> {
    const createExercise = new this.exerciseModel(createExcerciseDto);
    return createExercise.save();
  }

  async findAll(pagination: FilterExerciseDto) {
    const options = paginationQuery(pagination.page, pagination.page_size, [
      { path: 'author', select: '-deleted_at -createdAt -updatedAt' },
      {
        path: 'questions',
        populate: {
          path: 'question_sup.question_meta.image_sup',
          select: '-deleted_at -createdAt -updatedAt',
        },
      },
      {
        path: 'questions',
        populate: {
          path: 'question_sup.answer_correct.image_sup',
          select: '-deleted_at -createdAt -updatedAt',
        },
      },
      {
        path: 'questions',
        populate: {
          path: 'question_sup.answer_system.image_sup',
          select: '-deleted_at -createdAt -updatedAt',
        },
      },
      {
        path: 'questions',
        populate: {
          path: 'question_sup.answer_check.image_sup',
          select: '-deleted_at -createdAt -updatedAt',
        },
      },
    ]);
    const filters = queryFilters(pagination);
    const exercises = await this.exerciseModel.paginate(filters, options);
    return exercises;
  }

  async findOne(id: number) {
    try {
      const course = await this.exerciseModel
        .findOne({ id })
        .populate([
          { path: 'author', select: '-deleted_at -createdAt -updatedAt' },
          {
            path: 'questions',
            populate: {
              path: 'question_sup.question_meta.image_sup',
              select: '-deleted_at -createdAt -updatedAt',
            },
          },
          {
            path: 'questions',
            populate: {
              path: 'question_sup.answer_correct.image_sup',
              select: '-deleted_at -createdAt -updatedAt',
            },
          },
          {
            path: 'questions',
            populate: {
              path: 'question_sup.answer_system.image_sup',
              select: '-deleted_at -createdAt -updatedAt',
            },
          },
          {
            path: 'questions',
            populate: {
              path: 'question_sup.answer_check.image_sup',
              select: '-deleted_at -createdAt -updatedAt',
            },
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
  //! update
  async update(id: number, updateExcerciseDto: UpdateExcerciseDto) {
    try {
      const exercise = await this.exerciseModel.findOne({ id }).exec();
      if (!exercise) {
        throw new NotFoundException(`${id} not Found`);
      }
      const exerciseUpdate = await this.exerciseModel
        .findOneAndUpdate({ id: id }, updateExcerciseDto, { new: true })
        .exec();
      return exerciseUpdate;
    } catch (error) {
      throw new HttpException(`Error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //! remove
  async remove(id: number) {
    const exercise = await this.exerciseModel.findOne({ id }).exec();
    if (!exercise) {
      throw new NotFoundException(`${id} not Found`);
    }
    await this.exerciseModel
      .findOneAndUpdate({ id: id }, { deleted_at: Date.now() })
      .exec();
    throw new HttpException('Delete sucess', HttpStatus.OK);
  }
}
