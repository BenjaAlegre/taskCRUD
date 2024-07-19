import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IsUser implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    if (headers['x-role'] === 'user' || headers['x-role'] === 'admin') {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
