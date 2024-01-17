import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ScoreService } from './score.service';
import routes from 'src/routes/index.route';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, accessRole } from 'src/decorators/roles.decorators';
import { RolesGuard } from '../auth/guards/role.guard';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';

@Controller(routes.score)
@ApiTags(routes.score)
@ApiBearerAuth()
@Roles(accessRole.accessStudent_Trial)
@UseGuards(RolesGuard)
@UseGuards(JwtAccessTokenGuard)
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get('score/:idClass')
  scores(@Param('idClass') idClass: string) {
    return this.scoreService.scores(+idClass);
  }
}
