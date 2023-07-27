import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { AddListDto, MoveToFavoriteDto, DeleteOneDto } from './book.dto';

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
  getFavorites(@Param('userId', ParseIntPipe) userId: number,) {
    return this.bookService.getFavorites(userId)
  }


  @Post('addList')
  addOneInList(@Body() addListDto: AddListDto) {
    return this.bookService.addOneInList(addListDto)
  }

  @Post('addFavorite')
  moveOneToFavorite(@Body() moveToFavoriteDto: MoveToFavoriteDto) {
    return this.bookService.moveOneToFavorite(moveToFavoriteDto)
  }


  @Delete('delete')
  deleteOne(@Body() deleteOneDto: DeleteOneDto) {
    return this.bookService.deleteBook(deleteOneDto)
  }
}





