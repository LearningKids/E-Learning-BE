import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
  Req,
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
import { CreateNotificationClassDTO } from './dto/create-notofication-dto';
import { UpdateNotificationDto } from './dto/update-notification-dto';

@Controller(routes.class)
@ApiTags(routes.class)
@ApiBearerAuth()
@Roles(accessRole.accessStudent_Trial)
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
  findAll(@Req() request: any, @Query() filter: FilterClassDto) {
    const role = request.user.account.role;
    return this.classService.findAll(filter, role);
  }

  //! detail
  @Get(':id')
  @ResponseMessage('Succesfully')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }
  //! update
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }

  @Post('/notification')
  createNotification(
    @Body() createNotificationDTO: CreateNotificationClassDTO,
  ) {
    return this.classService.createNotify(createNotificationDTO);
  }

  @Get(':id/notification/:idNotify')
  detailNodification(
    @Param('id') id: string,
    @Param('idNotify') idNotify: string,
  ) {
    return this.classService.detailNotify(id, Number(idNotify));
  }

  @Put(':id/notification/:idNotify')
  updateNodification(
    @Param('id') id: string,
    @Param('idNotify') idNotify: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.classService.updateNotify(
      id,
      Number(idNotify),
      updateNotificationDto,
    );
  }

  @Delete(':id/notification/:idNotify')
  deleteNotification(
    @Param('id') id: string,
    @Param('idNotify') idNotify: string,
  ) {
    return this.classService.deleteNotify(id, Number(idNotify));
  }
}
