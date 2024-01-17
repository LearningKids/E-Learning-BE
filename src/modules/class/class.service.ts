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
import { CreateNotificationClassDTO } from './dto/create-notofication-dto';
import { UpdateNotificationDto } from './dto/update-notification-dto';
import baseRoles from 'src/helpers/baseRole';

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
      for (const teacher of createClassDto.teachers) {
        await this.accountService.findOne(teacher);
      }
      await this.courseService.findOne(createClassDto.course);
      const createClass = new this.classModel(createClassDto);
      return createClass.save();
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  //! all
  async findAll(pagination: any, role: number) {
    const options = paginationQuery(pagination.page, pagination.page_size, [
      {
        path: 'teachers',
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
    let paginationRole = pagination;
    if (role === baseRoles[1].id) {
      paginationRole = { ...paginationRole, teachers: role };
    }
    if (role === baseRoles[2].id || role === baseRoles[3].id) {
      paginationRole = { ...paginationRole, students: role };
    }
    const filters = queryFilters(paginationRole);
    const listClass = await this.classModel.paginate(filters, options);
    return listClass;
  }

  //! detail
  async findOne(_id: number) {
    try {
      const options = [
        {
          path: 'teachers',
          select: '-deleted_at -createdAt -updatedAt',
        },
        {
          path: 'students',
          select: '-deleted_at -createdAt -updatedAt',
        },
        {
          path: 'course',
          select: '-deleted_at -createdAt -updatedAt',
          populate: {
            path: 'content_lesson',
            select: '-deleted_at -createdAt -updatedAt',
          },
        },
      ];
      const classDetail = await methodBase.findOneByCondition(
        { _id },
        this.classModel,
        options,
      );
      if (!classDetail) {
        baseException.NotFound(`class id ${_id}`);
      }
      return classDetail;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async update(_id: number, updateClassDto: UpdateClassDto) {
    try {
      for (const student of updateClassDto.students) {
        await this.accountService.findOne(student);
      }
      for (const teacher of updateClassDto.teachers) {
        await this.accountService.findOne(teacher);
      }
      await this.courseService.findOne(updateClassDto.course);
      const classUpdate = await methodBase.findOneUpdate(
        { _id },
        this.classModel,
        updateClassDto,
      );
      if (!classUpdate) {
        baseException.NotFound(`exercise id ${_id}`);
      }
      return classUpdate;
    } catch (error) {
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

  async createNotify(createNotifyDTO: CreateNotificationClassDTO) {
    try {
      const classDetail = await methodBase.findOneByCondition(
        { _id: createNotifyDTO.idClass },
        this.classModel,
      );
      const arrayNotofy = classDetail.notification;
      if (arrayNotofy.length > 10) {
        throw new HttpException(
          'Notification of class must less than 10',
          HttpStatus.FORBIDDEN,
        );
      }
      arrayNotofy.push(createNotifyDTO);
      const NotifyCreate = await methodBase.findOneUpdate(
        { _id: createNotifyDTO.idClass },
        this.classModel,
        {
          $set: {
            notification: arrayNotofy,
          },
        },
      );
      return NotifyCreate.notification;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async detailNotify(idClass: string, idNotify: number) {
    try {
      const classDetail = await methodBase.findOneByCondition(
        { _id: idClass },
        this.classModel,
      );
      if (!classDetail) {
        baseException.NotFound(`class id ${idClass}`);
      }

      if (classDetail.notification.length - 1 < idNotify) {
        baseException.NotFound(`notification id ${idNotify} `);
      }
      return classDetail.notification[idNotify];
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async deleteNotify(idClass: string, idNotify: number) {
    try {
      const classDetail = await methodBase.findOneByCondition(
        { _id: idClass },
        this.classModel,
      );
      if (!classDetail) {
        baseException.NotFound(`class id ${idClass}`);
      }

      if (classDetail.notification.length - 1 < idNotify) {
        baseException.NotFound(`notification id ${idNotify} `);
      }
      const arrayNotofy = classDetail.notification;
      arrayNotofy.splice(idNotify, 1);
      const NotifyDelete = await methodBase.findOneUpdate(
        { _id: idClass },
        this.classModel,
        {
          $set: {
            notification: arrayNotofy,
          },
        },
      );
      return NotifyDelete.notification;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async updateNotify(
    idClass: string,
    idNotify: number,
    body: UpdateNotificationDto,
  ) {
    try {
      const classDetail = await methodBase.findOneByCondition(
        { _id: idClass },
        this.classModel,
      );
      if (!classDetail) {
        baseException.NotFound(`class id ${idClass}`);
      }

      if (classDetail.notification.length - 1 < idNotify) {
        baseException.NotFound(`notification id ${idNotify} `);
      }
      classDetail.notification[idNotify] = body;
      const NotifyUpdate = await methodBase.findOneUpdate(
        { _id: idClass },
        this.classModel,
        {
          $set: {
            notification: classDetail.notification,
          },
        },
      );
      return NotifyUpdate.notification[idNotify];
    } catch (error) {
      baseException.HttpException(error);
    }
  }
}
