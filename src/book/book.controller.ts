import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { BookService } from './book.service';


@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Get('getAll')
  getAll() {
    return this.bookService.getAll();
  }
  @Get('getOne/:id')
  getOne(@Param('id') id: string) {
    return this.bookService.getOne(id)
  }
  @Get('getFavorites/:userId')
  getFavorites(@Param('userId') userId: number) {
    return this.bookService.getFavorites(userId)
  }


  @Post('addList')
  addOneInList(@Body() dto: AddDto) {
    return this.bookService.addOneInList(dto)

  }

  @Post('addFavorite')
  moveOneToFavorite(@Body() dto: { id: string, user_id:number }) {
    return this.bookService.moveOneToFavorite(dto)
  }


  @Delete('delete')
  deleteOne(@Body() dto: { id: string }) {
    return this.bookService.deleteBook(dto.id)
  }
}


interface AddDto {
  id: string;
  title: string;
  description: string;
  authors: Array<string>;
}


export { AddDto }