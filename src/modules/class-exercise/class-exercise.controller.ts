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
  Req,
} from '@nestjs/common';
import { ClassExerciseService } from './class-exercise.service';
import { CreateClassExerciseDto } from './dto/create-class-exercise.dto';
import { UpdateClassExerciseDto } from './dto/update-class-exercise.dto';
import routes from 'src/routes/index.route';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, accessRole } from 'src/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';
import { FilterExerciseClassDto } from './dto/filter-exercise-class-dto';
import { BlockExerciseClassDto } from './dto/block-class-exercise.dto';

@Controller(routes.classExercise)
@ApiTags(routes.classExercise)
@ApiBearerAuth()
@Roles(accessRole.accessStudent_Trial)
@UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
export class ClassExerciseController {
  constructor(private readonly classExerciseService: ClassExerciseService) {}

  @Post(':idClass')
  create(
    @Param('idClass') idClass: string,
    @Body() createClassExerciseDto: CreateClassExerciseDto,
  ) {
    return this.classExerciseService.create(+idClass, createClassExerciseDto);
  }

  @Get(':idClass')
  findAll(
    @Param('idClass') idClass: string,
    @Req() request: any,
    @Query() filter: FilterExerciseClassDto,
  ) {
    const account = request.user.account;
    return this.classExerciseService.findAll(+idClass, filter, account);
  }

  @Get(':idClass/:idExerciseClass')
  findOne(
    @Param('idClass') idClass: string,
    @Param('idExerciseClass') idExerciseClass: string,
  ) {
    return this.classExerciseService.findOne(+idClass, +idExerciseClass);
  }

  @Put(':id')
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

  @Put('block/:id')
  blockExerciseClass(
    @Param('id') id: string,
    @Query() block: BlockExerciseClassDto,
  ) {
    return this.classExerciseService.block(+id, block);
  }
}
