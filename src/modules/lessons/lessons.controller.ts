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
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import routes from 'src/routes/index.route';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';
import { Roles, accessRole } from 'src/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/role.guard';
import { FilterLessontDto } from './dto/filter-lesson.dto';
import { ResponseMessage } from 'src/decorators/response.decorators';

@Controller(`${routes.lesson}`)
@ApiTags(`${routes.lesson}`)
@ApiBearerAuth()
@Roles(accessRole.accessTeacher)
@UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}
  //! Post
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }
  //! all
  @Get()
  findAll(@Query() filter: FilterLessontDto) {
    return this.lessonsService.findAll(filter);
  }
  //! detail
  @Get(':id')
  @ResponseMessage('Succesfully')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }
  //! update
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
