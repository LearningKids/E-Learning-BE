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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags } from '@nestjs/swagger';
import routes from 'src/routes/index.route';
import { FilterCourseDto } from './dto/filter-course.dto';
import { ResponseMessage } from 'src/decorators/response.decorators';

@ApiTags(`${routes.course}`)
@Controller(`${routes.course}`)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  //! post
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }
  //! get
  @Get()
  findAll(@Query() filter: FilterCourseDto) {
    return this.coursesService.findAll(filter);
  }
  //! detail
  @Get(':id')
  @ResponseMessage('Succesfully')
  findOne(@Param('id') id: number) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
