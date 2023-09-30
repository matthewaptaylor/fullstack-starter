import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './Public';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  /**
   * Determines whether the request is authorized.
   * @param context
   * @returns True if the request is authorized.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Ignore public routes
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // Get token
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (token === null) throw new UnauthorizedException();

    // Verify token
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Attach the decoded payload to the request object
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  /**
   * Extracts the JWT from the request's Authorization header.
   * @param request
   * @returns The JWT, or null if it wasn't found.
   */
  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
