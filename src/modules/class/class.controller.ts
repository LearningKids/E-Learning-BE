import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import routes from 'src/routes/index.route';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterClassDto } from './dto/filter-class.dto';
import { ResponseMessage } from 'src/decorators/response.decorators';
import { Roles, accessRole } from 'src/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';

@Controller(routes.class)
@ApiTags(routes.class)
@ApiBearerAuth()
@Roles(accessRole.accessAdmin)
@UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  //! get
  @Get()
  findAll(@Query() filter: FilterClassDto) {
    return this.classService.findAll(filter);
  }

  //! detail
  @Get(':id')
  @ResponseMessage('Succesfully')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }
  //! update
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }
}
