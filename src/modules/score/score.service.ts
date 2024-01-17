import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import methodBase from 'src/helpers/methodBase';
import baseException from 'src/helpers/baseException';
import { ClassExerciseService } from '../class-exercise/class-exercise.service';
import { ExerciseStudentService } from '../exercise-student/exercise-student.service';
import { InjectModel } from '@nestjs/mongoose';
import { ClassExercise } from '../class-exercise/entities/class-exercise.entity';
import { PaginateModel } from 'mongoose';
import { ExerciseStudent } from '../exercise-student/entities/exercise-student.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel(ClassExercise.name)
    private readonly classExerciseModel: PaginateModel<ClassExercise>,
    @InjectModel(ExerciseStudent.name)
    private readonly exerciseStudentModel: PaginateModel<ExerciseStudent>,

    private classExerciseService: ClassExerciseService,
    private classService: ExerciseStudentService,
  ) {}
  async scores(idClass: number) {
    try {
      const options = [
        {
          path: 'exercises_class',
          select: '-deleted_at -createdAt -updatedAt',
        },
      ];
      const listExerciseClass = await methodBase.findAllByCondition(
        {
          class_id: idClass,
        },
        this.classExerciseModel,
        options,
      );
      const listEx = [];
      const optionsExercise = [
        {
          path: 'answer_meta',
          select: '-deleted_at -createdAt -updatedAt',
        },
      ];
      const listExercise = listExerciseClass?.map(async (item) => {
        listEx.push(item.exercises_class.exercise_name);
        const listStudent = await methodBase.findAllByCondition(
          {
            classExercise: item._id,
          },
          this.exerciseStudentModel,
          [{ select: '-answer_meta' }],
        );
      });
      return listExerciseClass;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
}
