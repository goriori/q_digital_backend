import { Injectable, Inject } from '@nestjs/common';
// import { CreateCatDto } from './dto/create-cat.dto';
import { User } from './user.entity';
import { checkHashString, generateHashString } from 'src/utils/hash';
import { SignInDto, SignUpDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private catsRepository: typeof User
    ) { }

    async signIn(signInDto: SignInDto): Promise<object | boolean> {
        const findUser = await User.findOne({ where: { email: signInDto.email } })
        if (!findUser) return false
        const validPassword = await checkHashString(signInDto.password, findUser.password)
        if (!validPassword) return false
        const { name, email } = findUser
        return {
            status: 200,
            message: 'Success singin',
            data: { name, email }
        }
    }

    async signUp(signUpDto: SignUpDto): Promise<object | boolean> {

        const { name, password, email, confirm_password } = signUpDto
        if (password !== confirm_password) return { status: 402, error: "Password and Confirm_password mismatch" }
        const findExistUser = await User.findOne({ where: { email } })
        if (findExistUser) return false
        try {
            generateHashString(password, async (hashPassword) => {
                const createNewUser = await User.create({
                    name: name,
                    email: email,
                    password: hashPassword
                })
            })
            return { status: 200, message: 'Success signup' }
        } catch (error) {
            console.log(error)
        }

    }

}

