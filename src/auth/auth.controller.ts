import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { CreateUserDto, SignInDto, SingInResponse} from './dto/create-user.dto';
import { LoginService } from './auth.service';

@Controller('auth')
export class LoginController {
    constructor(private logInService: LoginService) {}
    @Post('register')
    registerNewUser(@Body() userPayload: CreateUserDto): Promise<Partial<SingInResponse>> {
        return this.logInService.registerNewUser(userPayload)
    }

    @Post('login')
    singIn(@Body() inputUserData: SignInDto): Promise<SingInResponse | HttpException> {
        // TODO: Validate inputUserData using validate Pipe
        const {userName: inputUserName, password } = inputUserData
        return this.logInService.signIn(inputUserName, password)
    }
}
