import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';

export enum TypeMember {
  Student = 'student',
  Teacher = 'teacher',
}
export class AddStudenTeacherClass {
  @ApiProperty({
    description: 'member join class',
    example: [1, 2],
  })
  @IsNotEmpty()
  @IsArray()
  members: number[];

  @ApiProperty({
    description: 'type member',
    example: TypeMember.Student,
    enum: TypeMember,
  })
  @IsNotEmpty()
  @IsEnum(TypeMember)
  member_type: string;
}
