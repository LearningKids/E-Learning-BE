import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
  Put,
} from '@nestjs/common';
import { ImagesupService } from './imagesup.service';
import { CreateImagesupDto } from './dto/create-imagesup.dto';
import { UpdateImagesupDto } from './dto/update-imagesup.dto';
import routes from 'src/routes/index.route';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, accessRole } from 'src/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';
import { FilterImagesuptDto } from './dto/filter-imagesup.dto';

@Controller(`${routes.imagesup}`)
@ApiTags(`${routes.imagesup}`)
// @ApiBearerAuth()
// @Roles(accessRole.accessAdmin)
// @UseGuards(RolesGuard)
// @UseGuards(JwtAccessTokenGuard)
export class ImagesupController {
  constructor(private readonly imagesupService: ImagesupService) {}

  @Post()
  create(@Body() createImagesupDto: CreateImagesupDto) {
    return this.imagesupService.create(createImagesupDto);
  }

  @Get()
  findAll(@Query() filter: FilterImagesuptDto) {
    return this.imagesupService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesupService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateImagesupDto: UpdateImagesupDto,
  ) {
    return this.imagesupService.update(+id, updateImagesupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesupService.remove(+id);
  }
}
