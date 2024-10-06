import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './dto/user.model';
import { InjectModel } from "@nestjs/sequelize";
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';


@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) {}
    async registerNewUser(newUser: CreateUserDto): Promise<any> {
        // TODO: Validate incoming data
        // 1. Check if user already exist
        // 2. Hash password with bcrypt
        // 3. Save user details and send response
        const isUserExist = await this.userModel.findOne({ where: 
            { [Op.or]: { userName: newUser.userName, phoneNumber: newUser.phoneNumber } }
        })
        if (isUserExist) {
            return 'UserName is already existed'
        }
        const saltRounds = 12
        const hashedPass = await bcrypt.hash(newUser.password, saltRounds)
        console.log(`:::::hash Password::::`,  hashedPass)
        const createUser = await this.userModel.create({...newUser})
        return {
            userId: createUser.id,
            userName: createUser.userName,
            phoneNumber: createUser?.phoneNumber ?? ''
        }
    }
}
