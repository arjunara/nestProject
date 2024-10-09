import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./user.service";
import { User } from '../dto/user.model'


@Controller('user')
export class UsersController {
    constructor(private userService: UsersService) {}
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll()
    }
}