import { Sequelize } from 'sequelize-typescript'
import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nest-js',
      });
      sequelize.addModels([User, Book]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];