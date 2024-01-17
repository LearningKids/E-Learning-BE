import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateClassExerciseDto } from './dto/create-class-exercise.dto';
import { UpdateClassExerciseDto } from './dto/update-class-exercise.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { ClassExercise } from './entities/class-exercise.entity';
import baseException from 'src/helpers/baseException';
import { ClassService } from '../class/class.service';
import { ExcercisesService } from '../exercises/excercises.service';
import { FilterExerciseClassDto } from './dto/filter-exercise-class-dto';
import paginationQuery from 'src/pagination';
import queryFilters from 'src/pagination/filters';
import methodBase from 'src/helpers/methodBase';
import { ExerciseStudent } from '../exercise-student/entities/exercise-student.entity';
import baseRoles from 'src/helpers/baseRole';
import { BlockExerciseClassDto } from './dto/block-class-exercise.dto';

@Injectable()
export class ClassExerciseService {
  constructor(
    @InjectModel(ClassExercise.name)
    private readonly classExerciseModel: PaginateModel<ClassExercise>,

    @InjectModel(ExerciseStudent.name)
    private readonly exerciseStudentModel: PaginateModel<ExerciseStudent>,

    private classService: ClassService,
    private exerciseService: ExcercisesService,
  ) {}
  async create(
    idClass: number,
    createClassExerciseDto: CreateClassExerciseDto,
  ) {
    try {
      await this.classService.findOne(idClass);
      await this.exerciseService.findOne(
        createClassExerciseDto.exercises_class,
      );
      const checkExerciseClass = await methodBase.findOneByCondition(
        {
          exercises_class: createClassExerciseDto.exercises_class,
          exercise_type: createClassExerciseDto.exercise_type,
          class_id: idClass,
        },
        this.classExerciseModel,
      );
      console.log(checkExerciseClass);
      if (checkExerciseClass) {
        throw new ForbiddenException(`Exercise is exist`);
      }
      const body = {
        ...createClassExerciseDto,
        class_id: idClass,
      };
      const createClassExercise = new this.classExerciseModel(body);
      return createClassExercise.save();
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async findAll(
    idClass: number,
    pagination: FilterExerciseClassDto,
    account: any,
  ) {
    try {
      await this.classService.findOne(idClass);
      const options = paginationQuery(pagination.page, pagination.page_size, [
        {
          path: 'exercises_class',
          select: '-deleted_at -createdAt -updatedAt',
        },
      ]);
      const filters = queryFilters({
        page: pagination.page,
        page_size: pagination.page_size,
        exercise_type: Number(pagination.exercise_type),
        // [Object.keys(exercises_class.exercises_class)]: pagination.exercise_name,
        class_id: idClass,
      });
      const listExerciseClass: any = await this.classExerciseModel.paginate(
        filters,
        options,
      );
      if (
        account.role === baseRoles[0].id ||
        account.role === baseRoles[1].id
      ) {
        return listExerciseClass;
      } else {
        const data = [];
        for (const item of listExerciseClass.data) {
          const exerciseStudent = await methodBase.findOneByCondition(
            {
              classExercise: item._id,
              student: account._id,
            },
            this.exerciseStudentModel,
          );
          const itemExercise = {
            _id: exerciseStudent?._id,
            class_id: exerciseStudent.class_id,
            exercises_class: item?.exercises_class,
            due_date: item?.due_date,
            exercise_type: item?.exercise_type,
            lesson_date: item?.lesson_date,
            status: exerciseStudent?.status,
            score: exerciseStudent?.score,
            percentScore: exerciseStudent?.percent_score,
          };
          data.push(itemExercise);
        }
        return {
          data,
          pagination: listExerciseClass.pagination,
        };
      }
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async findOne(idClass: number, idExerciseCLass: number) {
    try {
      await this.classService.findOne(idClass);
      const options = [
        {
          path: 'exercises_class',
          select: '-deleted_at -createdAt -updatedAt',
        },
      ];
      const exerciseClassDetail = await methodBase.findOneByCondition(
        { _id: idExerciseCLass },
        this.classExerciseModel,
        options,
      );
      if (!exerciseClassDetail) {
        baseException.NotFound(`exercise class id ${idExerciseCLass}`);
      }
      return exerciseClassDetail;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async update(_id: number, updateClassExerciseDto: UpdateClassExerciseDto) {
    try {
      const exerciseClassDetail = await methodBase.findOneByCondition(
        { _id },
        this.classExerciseModel,
      );
      const checkType =
        exerciseClassDetail.exercise_type ===
        updateClassExerciseDto.exercise_type;
      const checkExerciseClass = await methodBase.findOneByCondition(
        {
          exercises_class: updateClassExerciseDto.exercises_class,
          exercise_type: updateClassExerciseDto.exercise_type,
          // class_id: idClass,
        },
        this.classExerciseModel,
      );
      if (!exerciseClassDetail) {
        baseException.NotFound(`exercise class id ${_id}`);
      }
      if (checkExerciseClass && !checkType) {
        throw new ForbiddenException(`Exercise is exist`);
      }

      const exerciseClassUpdate = await methodBase.findOneUpdate(
        { _id },
        this.classExerciseModel,
        updateClassExerciseDto,
      );
      return exerciseClassUpdate;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async remove(_id: number) {
    try {
      const deleteExerciseCLass = await methodBase.remove(
        { _id },
        this.classExerciseModel,
      );
      if (!deleteExerciseCLass) {
        baseException.NotFound(`exercise class id ${_id}`);
      }
      throw new HttpException('Delete sucess', HttpStatus.OK);
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async block(_id: number, block: BlockExerciseClassDto) {
    try {
      const exerciseClassDetail = await methodBase.findOneUpdate(
        {
          _id,
        },
        this.classExerciseModel,
        block,
      );
      return exerciseClassDetail;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
}
