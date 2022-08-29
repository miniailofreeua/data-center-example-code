import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { IUser } from 'src/modules/users/interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: IUser = request.user;

    const matchRoles = (roles: string[], userRole: UserRole) => {
      return roles.includes(userRole);
    };

    return matchRoles(roles, user.role);
  }
}
