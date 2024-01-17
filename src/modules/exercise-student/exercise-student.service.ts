import { Injectable } from '@nestjs/common';
import { CreateExerciseStudentDto } from './dto/create-exercise-student.dto';
import { UpdateExerciseStudentDto } from './dto/update-exercise-student.dto';
import baseException from 'src/helpers/baseException';
import { InjectModel } from '@nestjs/mongoose';
import { ExerciseStudent } from './entities/exercise-student.entity';
import { PaginateModel } from 'mongoose';
import { ClassExerciseService } from '../class-exercise/class-exercise.service';
import { ClassService } from '../class/class.service';
import { FilterExerciseStudentClassDto } from './dto/filter-exercise-student.dto';
import paginationQuery from 'src/pagination';
import queryFilters from 'src/pagination/filters';
import methodBase from 'src/helpers/methodBase';
import {
  EXCERCISE_TYPE_ENTITY,
  status_exercise_student,
} from 'src/core/constants';

@Injectable()
export class ExerciseStudentService {
  constructor(
    @InjectModel(ExerciseStudent.name)
    private readonly ExerciseStudentModel: PaginateModel<ExerciseStudent>,
    private classExerciseService: ClassExerciseService,
    private classService: ClassService,
  ) {}
  async create(createExerciseStudentDto: CreateExerciseStudentDto) {
    try {
      const class_exercise = await this.classExerciseService.findOne(
        createExerciseStudentDto.idClass,
        createExerciseStudentDto.classExercise,
      );
      const classDetail = await this.classService.findOne(
        class_exercise.class_id,
      );
      const questions = class_exercise?.exercises_class?.questions;
      const classExercise = createExerciseStudentDto?.classExercise;
      for (const student of classDetail.students) {
        const createExerciseStudent = new this.ExerciseStudentModel({
          questions,
          classExercise,
          student: student._id,
        });

        await createExerciseStudent.save();
      }
      return classDetail;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async findAll(
    idClassExercise: number,
    pagination: FilterExerciseStudentClassDto,
  ) {
    try {
      const options = paginationQuery(pagination.page, pagination.page_size, [
        {
          path: 'student',
          select: '-deleted_at -createdAt -updatedAt',
        },
        {
          path: 'classExercise',
          select: '-deleted_at -createdAt -updatedAt',
        },
      ]);
      const filters = queryFilters({
        ...pagination,
        classExercise: idClassExercise,
      });
      const listExerciseClass = await this.ExerciseStudentModel.paginate(
        filters,
        options,
      );
      return listExerciseClass;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async findOne(_id: number) {
    try {
      const options = [
        {
          path: 'student',
          select: '-deleted_at -createdAt -updatedAt',
        },
        {
          path: 'questions',
          select: '-deleted_at -createdAt -updatedAt',
          populate: {
            path: 'question_meta',
            select: '-deleted_at -createdAt -updatedAt _id',
          },
        },
        {
          path: 'classExercise',
          select: '-deleted_at -createdAt -updatedAt',
          populate: [
            {
              path: 'exercises_class',
              select: '-deleted_at -createdAt -updatedAt',
            },
            {
              path: 'class_id',
              select: '-deleted_at -createdAt -updatedAt',
              populate: {
                path: 'course',
                select: '-deleted_at -createdAt -updatedAt',
              },
            },
          ],
        },
      ];
      const exerciseStudentDetail = await methodBase.findOneByCondition(
        { _id: _id },
        this.ExerciseStudentModel,
        options,
      );
      return exerciseStudentDetail;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  async getStatus(idClassExercise: number) {
    try {
      console.log('a');
      const exerciseStudents = await this.ExerciseStudentModel.find({
        classExercise: idClassExercise,
      });
      let status_done = 0;
      let status_unfinished = 0;
      let status_not_work = 0;
      for (const item of exerciseStudents) {
        if (item.status === status_exercise_student.done) {
          status_done += 1;
        } else if (item.status === status_exercise_student.unfinished) {
          status_unfinished += 1;
        } else {
          status_not_work += 1;
        }
      }
      return {
        status_done,
        status_unfinished,
        status_not_work,
      };
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async update(updateExerciseStudentDto: UpdateExerciseStudentDto) {
    try {
      const options = [
        {
          path: 'questions',
          select: '-deleted_at -createdAt -updatedAt',
          populate: {
            path: 'question_meta',
            select: '-deleted_at -createdAt -updatedAt _id',
          },
        },
      ];
      const exerciseStudent = await methodBase.findOneByCondition(
        {
          student: updateExerciseStudentDto.student,
          classExercise: updateExerciseStudentDto.classExercise,
        },
        this.ExerciseStudentModel,
        options,
      );
      const exerciseClass = await this.classExerciseService.findOne(
        updateExerciseStudentDto.class,
        updateExerciseStudentDto.classExercise,
      );

      const answers = [];
      const questions = exerciseStudent.questions;
      let countQuestionCorrect = 0;
      let countQuestion = 0;

      exerciseStudent.questions?.map((item) => {
        item.question_meta?.map((meta) => {
          const answer_correct = meta.answer_correct.answers.filter(
            (correct) => correct.score > 0,
          );
          countQuestion += answer_correct.length;
        });
      });

      for (const [key, value] of Object.entries(
        updateExerciseStudentDto.answers,
      )) {
        const array = key.split('_');
        const question = questions.find((item) => item._id == array[0]);
        const question_meta = question.question_meta.find(
          (item_meta) => item_meta._id == array[1],
        );
        const answer_correct = question_meta.answer_correct.answers.filter(
          (item) => item.score > 0,
        );
        const scoreCheck =
          answer_correct[array[2] || 0].answer == value
            ? answer_correct[array[2] || 0].score
            : 0;
        const answer = {
          question: Number(array[0]),
          question_meta: Number(array[1]),
          index: Number(array[2]) ?? '',
          score: scoreCheck,
          answer: value,
        };
        if (scoreCheck > 0) {
          countQuestionCorrect += 1;
        }
        answers.push(answer);
      }
      const percent_score = Number.parseFloat(
        String((100 / countQuestion) * countQuestionCorrect),
      ).toFixed(0);
      const score = Number.parseFloat(
        String((10 / countQuestion) * countQuestionCorrect),
      ).toFixed(1);

      const status =
        score > exerciseClass?.pass_score
          ? status_exercise_student.done
          : status_exercise_student.unfinished;
      const mark = await methodBase.findOneUpdate(
        {
          student: updateExerciseStudentDto.student,
          classExercise: updateExerciseStudentDto.classExercise,
        },
        this.ExerciseStudentModel,
        { answer_meta: answers, percent_score, score, status },
      );

      return mark;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
}
