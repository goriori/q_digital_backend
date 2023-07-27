import { Model, Table, Column, AutoIncrement, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'

import { Book } from 'src/book/book.entity';

@Table
export class User extends Model {
    @ForeignKey(() => Book)
    @AutoIncrement
    @PrimaryKey 
    @Column
    id: number;

    @Column
    name: string;

    @Column
    email: string;

    @Column
    password: string;


    @BelongsTo(() => Book)
    book: Book

}