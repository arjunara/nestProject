import { Controller, Post, Body, HttpException, Get, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto, SignInDto, SingInResponse} from './dto/create-user.dto';
import { LoginService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { skipAuth } from 'src/decorator/skipAuth';

@Controller('auth')
export class LoginController {
    constructor(private logInService: LoginService) {}
    @skipAuth()
    @Post('register')
    registerNewUser(@Body() userPayload: CreateUserDto): Promise<Partial<SingInResponse>> {
        return this.logInService.registerNewUser(userPayload)
    }

    @skipAuth()
    @Post('login')
    singIn(@Body() inputUserData: SignInDto): Promise<SingInResponse | HttpException> {
        // TODO: Validate inputUserData using validate Pipe
        const {userName: inputUserName, password } = inputUserData
        return this.logInService.signIn(inputUserName, password)
    }

    // @UseGuards(AuthGuard)   // IF you globally applied AuthGuard no need to mention every endpoint
    @Get('profile')
    getProfile(@Request() req) {
        console.log(`:::::::::`,  req.url, req.user)
        return req.user
    }
}
