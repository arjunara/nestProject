import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private logInService: LoginService) {}
    @Post('register')
    registerNewUser(@Body() userPayload: CreateUserDto) {
        return this.logInService.registerNewUser(userPayload)
    }
}
