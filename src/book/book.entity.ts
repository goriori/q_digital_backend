import { DataTypes } from 'sequelize';
import { Table, Model, Column, AutoIncrement, PrimaryKey, IsUUID, BelongsToMany, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript'
import { User } from 'src/user/user.entity';

@Table
export class Book extends Model<Book> {
    @PrimaryKey
    @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
    id: string;

    @Column
    title: string;

    @Column({ type: DataTypes.JSON })
    authors: string


    @Column({ type: DataTypes.TEXT })
    description: string;


    @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
    favorite: boolean


    @ForeignKey(() => User)
    @Column({ field: 'userId' })
    userId: number;
    
    @HasMany(() => User)
    user: User;


}



// @Table
// export class BookUser extends Model<BookUser> {


//     bookId: string;

//     @BelongsToMany(() => User, { through: 'BookUser' },)
//     userId: number;

//     @Column({ type: DataTypes.BOOLEAN })
//     statusFavorite: boolean
// }




