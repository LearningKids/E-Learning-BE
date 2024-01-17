import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import baseException from 'src/helpers/baseException';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from './entities/schedule.entity';
import { PaginateModel } from 'mongoose';
import { DayofWeek } from 'src/core/constants';
import { learning_day_type } from '../class/entities/class.entity';
import { PaginationDto } from 'src/pagination/dto/index.dto';
import methodBase from 'src/helpers/methodBase';
import { ClassService } from '../class/class.service';
import { CompleteScheduleDto } from './dto/complete-schedule.dto';
import { AttendanceScheduleDto } from './dto/attendance-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name)
    private readonly scheduleModel: PaginateModel<Schedule>,
    private classService: ClassService,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    try {
      const data = this.handleSchedule(
        createScheduleDto.start_date,
        createScheduleDto.end_date,
        createScheduleDto.learing_day,
      );

      const classDetail = await this.classService.findOne(
        createScheduleDto.class_schedule,
      );

      const students = classDetail?.students?.map((item) => {
        return {
          studentId: item._id,
          studentName: item.fullname,
          date_of_birth: item.date_of_birth,
          status: '',
        };
      });

      const dataSchedule = data.map((item, index) => ({
        ...item,
        link_record: '',
        link_slide: '',
        note: '',
        content: '',
        isComplete: false,
        day: index + 1,
        attendance: students,
      }));
      const createSchedule = new this.scheduleModel({
        class_schedule: createScheduleDto.class_schedule,
        schedule: dataSchedule,
      });
      return createSchedule.save();
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async findOne(idClass: number, filter: PaginationDto) {
    try {
      const data = await methodBase.findOneByCondition(
        { class_schedule: idClass },
        this.scheduleModel,
      );
      const startIndex = (filter.page - 1) * filter.page_size;
      const endIndex = filter.page * filter.page_size;
      const totalPage = Math.ceil(data.schedule.length / filter.page_size);
      data.schedule = data.schedule.slice(startIndex, endIndex);
      return {
        data,
        totalPage,
      };
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  async detailSchedule(idClass: number, idSchedule: number) {
    try {
      const dataSchedule = await methodBase.findOneByCondition(
        { class_schedule: idClass },
        this.scheduleModel,
      );

      if (dataSchedule?.schedule[idSchedule - 1]) {
        return dataSchedule?.schedule[idSchedule - 1];
      } else {
        baseException.NotFound(`schedule id ${idSchedule}`);
      }
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async update(
    idClass: number,
    idSchedule: number,
    updateScheduleDto: UpdateScheduleDto,
  ) {
    try {
      const dataSchedule = await methodBase.findOneByCondition(
        { class_schedule: idClass },
        this.scheduleModel,
      );
      const scheduleEdit = {
        ...dataSchedule?.schedule[idSchedule - 1],
        ...updateScheduleDto,
      };
      dataSchedule.schedule[idSchedule - 1] = scheduleEdit;
      const scheduleUpdate = await methodBase.findOneUpdate(
        { class_schedule: idClass },
        this.scheduleModel,
        dataSchedule,
      );
      return scheduleUpdate;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async complete(
    idClass: number,
    idSchedule: number,
    completeScheduleDto: CompleteScheduleDto,
  ) {
    try {
      const dataSchedule = await methodBase.findOneByCondition(
        { class_schedule: idClass },
        this.scheduleModel,
      );
      const scheduleEdit = {
        ...dataSchedule?.schedule[idSchedule - 1],
        ...completeScheduleDto,
      };
      dataSchedule.schedule[idSchedule - 1] = scheduleEdit;
      const scheduleUpdate = await methodBase.findOneUpdate(
        { class_schedule: idClass },
        this.scheduleModel,
        dataSchedule,
      );
      return scheduleUpdate;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async attendance(
    idClass: number,
    idSchedule: number,
    students: AttendanceScheduleDto,
  ) {
    try {
      const dataSchedule = await methodBase.findOneByCondition(
        { class_schedule: idClass },
        this.scheduleModel,
      );

      const scheduleEdit = {
        ...dataSchedule?.schedule[idSchedule - 1],
        isComplete: true,
        attendance: students.attendance,
      };
      dataSchedule.schedule[idSchedule - 1] = scheduleEdit;
      const scheduleUpdate = await methodBase.findOneUpdate(
        { class_schedule: idClass },
        this.scheduleModel,
        dataSchedule,
      );
      return scheduleUpdate.schedule[idSchedule - 1];
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  handleSchedule(
    startDate: Date,
    endDate: Date,
    classDays: learning_day_type[],
  ) {
    const schedule = [];
    const day_learing = classDays?.map((item) => {
      return item.day_of_week;
    });
    const currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      const currentDayOfWeek = DayofWeek[currentDate.getDay()];

      if (day_learing.includes(currentDayOfWeek.value)) {
        const dayLearn = classDays.find(
          (item) => item.day_of_week == currentDayOfWeek.value,
        );
        schedule.push({
          date: currentDate.toISOString(),
          start_time: dayLearn.start_time,
          end_time: dayLearn.end_time,
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return schedule;
  }
}
