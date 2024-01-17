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
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import routes from 'src/routes/index.route';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, accessRole } from 'src/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';
import { PaginationDto } from 'src/pagination/dto/index.dto';
import { CompleteScheduleDto } from './dto/complete-schedule.dto';
import { AttendanceScheduleDto } from './dto/attendance-schedule.dto';

@Controller(routes.schedule)
@ApiTags(routes.schedule)
@ApiBearerAuth()
@Roles(accessRole.accessStudent_Trial)
@UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get(':idClass')
  findOne(@Param('idClass') idClass: string, @Query() filter: PaginationDto) {
    return this.scheduleService.findOne(+idClass, filter);
  }
  @Get(':idClass/:idSchedule')
  detailSchedule(
    @Param('idClass') idClass: string,
    @Param('idSchedule') idSchedule: string,
  ) {
    return this.scheduleService.detailSchedule(+idClass, +idSchedule);
  }

  @Put(':idClass/:idSchedule')
  update(
    @Param('idClass') idClass: string,
    @Param('idSchedule') idSchedule: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(
      +idClass,
      +idSchedule,
      updateScheduleDto,
    );
  }
  @Put('complete/:idClass/:idSchedule')
  complete(
    @Param('idClass') idClass: string,
    @Param('idSchedule') idSchedule: string,
    @Body() completeScheduleDto: CompleteScheduleDto,
  ) {
    return this.scheduleService.complete(
      +idClass,
      +idSchedule,
      completeScheduleDto,
    );
  }

  @Put('attendance/:idClass/:idSchedule')
  attendance(
    @Param('idClass') idClass: string,
    @Param('idSchedule') idSchedule: string,
    @Body() attendanceScheduleDto: AttendanceScheduleDto,
  ) {
    return this.scheduleService.attendance(
      +idClass,
      +idSchedule,
      attendanceScheduleDto,
    );
  }
}
