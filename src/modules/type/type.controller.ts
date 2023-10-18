import { Controller, Get, Body, Param, Query } from '@nestjs/common';
import { TypeService } from './type.service';
import { ApiTags } from '@nestjs/swagger';
import { GetTypeDto } from './type.dto';

@Controller('type')
@ApiTags(`types`)
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  findAll(@Query() getType: GetTypeDto) {
    const { type } = getType;
    return this.typeService.findAll(type);
  }
}
