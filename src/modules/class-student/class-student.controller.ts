import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ClassStudentService } from './class-student.service';
import { AddStudenTeacherClass } from './dto/create-class-student.dto';
import routes from 'src/routes/index.route';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, accessRole } from 'src/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';
import { FilterStudentClassDto } from './dto/filter-student-class.dto';

@Controller(routes.classStudent)
@ApiTags(routes.classStudent)
@ApiBearerAuth()
@Roles(accessRole.accessTeacher)
@UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
export class ClassStudentController {
  constructor(private readonly classStudentService: ClassStudentService) {}
  //! add student/teacher to class
  @Post(':idClass')
  create(
    @Param('idClass') idClass: string,
    @Body() memberJoin: AddStudenTeacherClass,
  ) {
    return this.classStudentService.create(+idClass, memberJoin);
  }

  //! remove student/teacher class
  @Delete(':idClass/:idMember')
  remove(
    @Param('idClass') idClass: string,
    @Param('idMember') idMember: string,
  ) {
    return this.classStudentService.remove(+idClass, +idMember);
  }

  @Get(':idClass')
  get(
    @Param('idClass') idClass: string,
    @Query() filter: FilterStudentClassDto,
  ) {
    return this.classStudentService.getStudents(+idClass, filter);
  }
}
