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
  Req,
  Put,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import routes from 'src/routes/index.route';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, accessRole } from 'src/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';
import { FilterQuestiontDto } from './dto/filter-question.dto';
import { ResponseMessage } from 'src/decorators/response.decorators';

@Controller(`${routes.question}`)
@ApiTags(`${routes.question}`)
@ApiBearerAuth()
@Roles(accessRole.accessTeacher)
@UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto, @Req() request: any) {
    const { id } = request.user?.account;
    return this.questionsService.create(createQuestionDto, id);
  }

  @Get()
  findAll(@Query() filter: FilterQuestiontDto, @Req() request: any) {
    const { id } = request.user?.account;
    return this.questionsService.findAll(filter, id);
  }

  @Get(':id')
  @ResponseMessage('Succesfully')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
