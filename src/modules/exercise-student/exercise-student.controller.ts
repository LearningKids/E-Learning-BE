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
  Put,
} from '@nestjs/common';
import { ExerciseStudentService } from './exercise-student.service';
import { CreateExerciseStudentDto } from './dto/create-exercise-student.dto';
import { UpdateExerciseStudentDto } from './dto/update-exercise-student.dto';
import routes from 'src/routes/index.route';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, accessRole } from 'src/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';
import { FilterExerciseStudentClassDto } from './dto/filter-exercise-student.dto';

@Controller(routes.exercise_student)
@ApiTags(routes.class)
@ApiBearerAuth()
@Roles(accessRole.accessStudent_Trial)
@UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
export class ExerciseStudentController {
  constructor(
    private readonly exerciseStudentService: ExerciseStudentService,
  ) {}

  @Post()
  create(@Body() createExerciseStudentDto: CreateExerciseStudentDto) {
    return this.exerciseStudentService.create(createExerciseStudentDto);
  }

  @Get(':idClassExercise')
  findAll(
    @Param('idClassExercise') idClassExercise: string,
    @Query() filters: FilterExerciseStudentClassDto,
  ) {
    return this.exerciseStudentService.findAll(+idClassExercise, filters);
  }

  @Get(':idClassExercise/:id')
  findOne(
    @Param('idClassExercise') idClassExercise: string,
    @Param('id') id: string,
  ) {
    return this.exerciseStudentService.findOne(+id);
  }

  @Get(':idClassExercise/status/student')
  getStatus(@Param('idClassExercise') idClassExercise: string) {
    return this.exerciseStudentService.getStatus(+idClassExercise);
  }

  @Put()
  update(@Body() updateExerciseStudentDto: UpdateExerciseStudentDto) {
    return this.exerciseStudentService.update(updateExerciseStudentDto);
  }
}
