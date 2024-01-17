import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  AddStudenTeacherClass,
  TypeMember,
} from './dto/create-class-student.dto';
import methodBase from 'src/helpers/methodBase';
import baseException from 'src/helpers/baseException';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from '../class/entities/class.entity';
import { PaginateModel } from 'mongoose';
import { AccountsService } from '../accounts/accounts.service';
import baseRoles from 'src/helpers/baseRole';
import * as _ from 'lodash';
import { FilterStudentClassDto } from './dto/filter-student-class.dto';

@Injectable()
export class ClassStudentService {
  constructor(
    @InjectModel(Class.name)
    private readonly classStudentModel: PaginateModel<Class>,
    private readonly accountServices: AccountsService,
  ) {}
  async create(idClass: number, memberJoin: AddStudenTeacherClass) {
    try {
      const classJoin = await methodBase.findOneByCondition(
        { _id: idClass },
        this.classStudentModel,
      );
      if (!classJoin) {
        baseException.NotFound(`class id ${idClass}`);
      }
      if (memberJoin.members.length < 1) {
        throw new BadRequestException(`Member must be add`);
      }
      for (const member of memberJoin.members) {
        const getAccount = await this.accountServices.findOne(member);
      }

      if (memberJoin.member_type === TypeMember.Student) {
        classJoin.students = _.uniq(
          classJoin.students.concat(memberJoin.members),
        );
      } else {
        classJoin.teachers = _.uniq(
          classJoin.teachers.concat(memberJoin.members),
        );
      }
      console.log(classJoin);
      const membersClass = await methodBase.findOneUpdate(
        { _id: idClass },
        this.classStudentModel,
        classJoin,
      );
      return membersClass;
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  async remove(idClass: number, idMember: number) {
    try {
      const classStudent = await methodBase.findOneByCondition(
        { _id: idClass },
        this.classStudentModel,
      );
      if (!classStudent) {
        baseException.NotFound(`class id ${idClass}`);
      }
      const exists =
        classStudent.students.includes(idMember) ||
        classStudent.teachers.includes(idMember);
      if (!exists) {
        baseException.NotFound(`Member id ${idMember}`);
      }
      const getAccount = await this.accountServices.findOne(idMember);
      if (
        getAccount.role != baseRoles[0].id &&
        getAccount.role != baseRoles[1].id
      ) {
        const students = classStudent.students?.filter(
          (student) => student !== idMember,
        );
        classStudent.students = students;
      } else {
        const teachers = classStudent.teachers?.filter(
          (teacher) => teacher !== idMember,
        );
        classStudent.teachers = teachers;
      }

      const deleteStudentClass = await methodBase.findOneUpdate(
        { _id: idClass },
        this.classStudentModel,
        classStudent,
      );

      throw new HttpException('Delete sucess', HttpStatus.OK);
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  async getStudents(idClass: number, filter: FilterStudentClassDto) {
    try {
      const classStudent = await methodBase.findOneByCondition(
        { _id: idClass },
        this.classStudentModel,
      );
      if (!classStudent) {
        baseException.NotFound(`class id ${idClass}`);
      }
      console.log(classStudent);
    } catch (error) {
      baseException.HttpException(error);
    }
  }
}
