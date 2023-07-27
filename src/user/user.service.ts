import { Injectable, Inject } from '@nestjs/common';
// import { CreateCatDto } from './dto/create-cat.dto';
import { User } from './user.entity';
import { checkHashString, generateHashString } from 'src/utils/hash';
export { SignInDto, SignUpDto }

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private catsRepository: typeof User
    ) { }

    async signIn(dto: SignInDto): Promise<object | boolean> {
        const findUser = await User.findOne({ where: { email: dto.email } })
        if (!findUser) return false
        const validPassword = await checkHashString(dto.password, findUser.password)
        if (!validPassword) return false
        const { name, email } = findUser
        return {
            status: 200,
            message: 'Success singin',
            data: { name, email }
        }
    }

    async signUp(dto: SignUpDto): Promise<object | boolean> {
        
        const { name, password, email, confirm_password } = dto
        if (password !== confirm_password) return { status: 402, error: "Password and Confirm_password mismatch" }
        const findExistUser = await User.findOne({ where: { email } })
        if (findExistUser) return false
        try {
            const { name, email, password } = dto
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

interface SignInDto {
    email: string;
    password: string;
}

interface SignUpDto {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}