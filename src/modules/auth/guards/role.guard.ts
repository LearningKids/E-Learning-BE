import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES } from 'src/decorators/roles.decorators';
import baseRoles from 'src/helpers/baseRole';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly refector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.refector.getAllAndOverride(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request: any = context.switchToHttp().getRequest();
    const role = baseRoles.find((role) => role.id === request.user.role);

    return roles.includes(role.roleName as unknown as string);
  }
}
