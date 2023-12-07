import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ExcercisesService } from './excercises.service';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import routes from 'src/routes/index.route';
import { ResponseMessage } from 'src/decorators/response.decorators';
import { FilterExerciseDto } from './dto/filter-exercise.dto';
import { Roles, accessRole } from 'src/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';

@Controller(`${routes.exercise}`)
@ApiTags(`${routes.exercise}`)
@ApiBearerAuth()
@Roles(accessRole.accessTeacher)
@UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
export class ExcercisesController {
  constructor(private readonly excercisesService: ExcercisesService) {}

  @Post()
  create(@Body() createExcerciseDto: CreateExcerciseDto, @Req() request: any) {
    const { id } = request.user?.account;
    const dataCreate = { ...createExcerciseDto, author: id };
    return this.excercisesService.create(dataCreate);
  }

  @Get()
  findAll(@Query() filter: FilterExerciseDto, @Req() request: any) {
    const { id } = request.user?.account;
    return this.excercisesService.findAll(filter, id);
  }

  @Get(':id')
  @ResponseMessage('Succesfully')
  findOne(@Param('id') id: string) {
    return this.excercisesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateExcerciseDto: UpdateExcerciseDto,
  ) {
    return this.excercisesService.update(+id, updateExcerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.excercisesService.remove(+id);
  }
}
