import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ExcercisesService } from './excercises.service';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { ApiTags } from '@nestjs/swagger';
import routes from 'src/routes/index.route';
import { ResponseMessage } from 'src/decorators/response.decorators';
import { FilterExerciseDto } from './dto/filter-exercise.dto';

@Controller(`${routes.exercise}`)
@ApiTags(`${routes.exercise}`)
export class ExcercisesController {
  constructor(private readonly excercisesService: ExcercisesService) {}

  @Post()
  create(@Body() createExcerciseDto: CreateExcerciseDto) {
    return this.excercisesService.create(createExcerciseDto);
  }

  @Get()
  findAll(@Query() filter: FilterExerciseDto) {
    return this.excercisesService.findAll(filter);
  }

  @Get(':id')
  @ResponseMessage('Succesfully')
  findOne(@Param('id') id: string) {
    return this.excercisesService.findOne(+id);
  }

  @Patch(':id')
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
