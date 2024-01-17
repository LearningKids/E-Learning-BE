import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class AttendanceScheduleDto {
  @ApiProperty({
    example: [
      {
        studentId: 23,
        studentName: 'Cuong Student3',
        date_of_birth: '2023-12-19T17:00:00.000Z',
        status: 'joined',
      },
      {
        studentId: 3,
        studentName: 'Student',
        date_of_birth: '2001-01-01T00:00:00.000Z',
        status: 'joined',
      },
      {
        studentId: 21,
        studentName: 'Cuong Student1',
        date_of_birth: '2023-12-19T17:00:00.000Z',
        status: 'off_leave',
      },
      {
        studentId: 20,
        studentName: 'Cuong Student',
        date_of_birth: '2023-12-19T17:00:00.000Z',
        status: 'joined',
      },
      {
        studentId: 24,
        studentName: 'Cuong Student4',
        date_of_birth: '2023-12-19T17:00:00.000Z',
        status: 'off_leave',
      },
      {
        studentId: 25,
        studentName: 'Cuong Student5',
        date_of_birth: '2023-12-19T17:00:00.000Z',
        status: 'off',
      },
      {
        studentId: 27,
        studentName: 'Cuong Student7',
        date_of_birth: '2023-12-19T17:00:00.000Z',
        status: 'off',
      },
      {
        studentId: 34,
        studentName: 'Cuong Student13',
        date_of_birth: '2023-12-19T17:00:00.000Z',
        status: 'joined',
      },
      {
        studentId: 33,
        studentName: 'Cuong Student12',
        date_of_birth: '2023-12-19T17:00:00.000Z',
        status: 'joined',
      },
      {
        studentId: 31,
        studentName: 'Cuong Student11',
        date_of_birth: '2023-12-19T17:00:00.000Z',
        status: 'joined',
      },
    ],
    description: ' status day lessson',
  })
  @IsNotEmpty()
  @IsArray()
  attendance: {
    student: number;
    status: '';
  }[];
}
