import { Controller, Get, Post, Body,  } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto, SignUpDto } from './user.service';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Post('signin')
    
    async signIn(@Body() dto: SignInDto,) {
        const authStatus = await this.userService.signIn(dto)
        if (!authStatus) return {
            status: 401,
            message: 'Unauthorize',
            error: 'email or password inccorect'
        }
        
        return authStatus
    }

    @Post('signup')
    async signUp(@Body() dto: SignUpDto,) {
        const signupStatus = await this.userService.signUp(dto)
        if (!signupStatus) return {
            status: 409,
            message: 'This email already exsist'
        }
        return signupStatus
    }
}
