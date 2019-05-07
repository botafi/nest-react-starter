import { JwtAuthGuard } from './jwtAuth.guard';
import { User } from './user.entity';
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserRole, UserRoleAscendency, checkUserRole } from './userRole.enum';

@Injectable()
export class RoleGuard extends JwtAuthGuard {
    constructor(private role: UserRole) {
        super();
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { user } = context.switchToHttp().getRequest();
        return (await super.canActivate(context)) && checkUserRole((user as User).role, this.role)
    }
}