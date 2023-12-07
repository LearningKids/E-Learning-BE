import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClassExerciseService } from './class-exercise.service';
import { CreateClassExerciseDto } from './dto/create-class-exercise.dto';
import { UpdateClassExerciseDto } from './dto/update-class-exercise.dto';
import routes from 'src/routes/index.route';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, accessRole } from 'src/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';

@Controller(routes.classExercise)
@ApiTags(routes.classExercise)
@ApiBearerAuth()
@Roles(accessRole.accessStudent_Trial)
@UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
export class ClassExerciseController {
  constructor(private readonly classExerciseService: ClassExerciseService) {}

  @Post()
  create(@Body() createClassExerciseDto: CreateClassExerciseDto) {
    return this.classExerciseService.create(createClassExerciseDto);
  }

  @Get()
  findAll() {
    return this.classExerciseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classExerciseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassExerciseDto: UpdateClassExerciseDto,
  ) {
    return this.classExerciseService.update(+id, updateClassExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classExerciseService.remove(+id);
  }
}
