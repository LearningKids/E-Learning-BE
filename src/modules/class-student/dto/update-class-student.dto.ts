import { PartialType } from '@nestjs/mapped-types';
import { AddStudenTeacherClass } from './create-class-student.dto';

export class UpdateClassStudentDto extends PartialType(AddStudenTeacherClass) {}
