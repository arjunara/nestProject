import { Injectable, BadRequestException, InternalServerErrorException , HttpException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, SingInResponse } from './dto/create-user.dto';
import { User } from './dto/user.model';
import { InjectModel } from "@nestjs/sequelize";
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private jwtService: JwtService
    ) {}
    async registerNewUser(newUser: CreateUserDto): Promise<any> {
        // TODO: Validate incoming data
        // 1. Check if user already exist
        // 2. Hash password with bcrypt
        // 3. Save user details and send response
        try {
            const isUserExist = await this.userModel.findOne({ where: 
                { [Op.or]: { userName: newUser.userName, phoneNumber: newUser.phoneNumber } }
            })
            if (isUserExist) {
                return 'UserName is already existed'
            }
            const saltRounds = 12
            const hashedPass = await bcrypt.hash(newUser.password, saltRounds)
            console.log(`:::::hash Password::::`,  hashedPass, newUser)
            const createUser = await this.userModel.create({...newUser, password: hashedPass })
            return {
                userId: createUser.id,
                userName: createUser.userName,
                phoneNumber: createUser?.phoneNumber ?? ''
            }
        } catch (e) {
            return new InternalServerErrorException(e)
        }
    }

    async generateToken(payload: any): Promise<string> {
        return await this.jwtService.signAsync(payload)
    }

    async signIn(inputUserName: string, password: string): Promise<SingInResponse | HttpException> {
        if (!inputUserName || !password) {
            return new BadRequestException()
        }
        const user = await this.userModel.findOne({ where: { userName: inputUserName }})
        if (!user) return new BadRequestException()
        const { password: userPassword, id: userId, userName, phoneNumber } = user
        // Validate User password
        const isValidPass = await bcrypt.compare(password, userPassword)
        if (!isValidPass) {
            return new UnauthorizedException()
        }
        // If password is valid, then generate token and send as reponse
        const accessToken = await this.generateToken({userId, userName, phoneNumber})
        return { accessToken, userId, userName, phoneNumber }
    }
}
