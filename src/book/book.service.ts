import { Injectable, Inject } from '@nestjs/common';
// import { CreateCatDto } from './dto/create-cat.dto';
import { Book } from './book.entity';
import { checkHashString, generateHashString } from 'src/utils/hash';
import { AddListDto, DeleteOneDto, MoveToFavoriteDto } from './book.dto';


@Injectable()
export class BookService {
    constructor(
        @Inject('BOOK_REPOSITORY')
        private catsRepository: typeof Book
    ) { }

    async getAll() {
        return await Book.findAll()
    }
    async getOne(id: string) {
        const findBook = await Book.findOne({ where: { id } })
        if (!findBook) return { status: 404, message: "Not found" }
        return findBook
    }
    async getFavorites(userId: number) {
        try {
            const findBooksFavorite = await Book.findAll({ where: { favorite: true, userId } })
            return findBooksFavorite
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async addOneInList(AddListDto: AddListDto) {
        try {
            const { id, title, authors, description, userId } = AddListDto
            await Book.create({ id, title, authors: JSON.stringify(authors), description, userId })
            return {
                status: 200,
                message: "Success add to List"
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async moveOneToFavorite(moveToFavoriteDtoo: MoveToFavoriteDto) {
        try {
            const { id, user_id } = moveToFavoriteDtoo
            const findBook = await Book.findOne({ where: { id, userId: user_id } })
            if (!findBook) return { status: 404, error: 'Not found' }
            await findBook.update({ favorite: !findBook.favorite })
            return { status: 200, message: "Success change status book favorite category" }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async deleteBook(deleteOneDto: DeleteOneDto) {
        const { id, user_id } = deleteOneDto
        const findBook = await Book.findOne({ where: { id, userId: user_id } })
        if (!findBook) return { status: 404, error: 'Not found' }
        await findBook.destroy()
        return { status: 200, message: "Success delete book" }
    }
}

