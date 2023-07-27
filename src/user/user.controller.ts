import { Controller, Get, Post, Body, } from '@nestjs/common';
import { UserService } from './user.service';

import { SignInDto, SignUpDto } from './user.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Post('signin')

    async signIn(@Body() signInDto: SignInDto,) {
        const authStatus = await this.userService.signIn(signInDto)
        if (!authStatus) return {
            status: 401,
            message: 'Unauthorize',
            error: 'email or password inccorect'
        }

        return authStatus
    }

    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto,) {
        const signupStatus = await this.userService.signUp(signUpDto)
        if (!signupStatus) return {
            status: 409,
            message: 'This email already exsist'
        }
        return signupStatus
    }
}
