import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { IS_PUBLIC_KEY } from "src/decorator/skipAuth";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private jwtService: JwtService, private reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Check public Decorator
        const canAuthSkip = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (canAuthSkip) {
            // some logic may here
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const accessToken = this.extractTokenFromHeader(request)
        if (!accessToken) {
            throw new UnauthorizedException()
        }
        try {
            const payload = await this.jwtService.verifyAsync(accessToken)
            request['user'] = payload
        } catch (e) {
            console.log(`:::::Auth Exception::::`,  e)
            throw new UnauthorizedException()
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}