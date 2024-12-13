import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

export const databaseProvider = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (config: ConfigService) => {
            try {
               const sequelize: Sequelize = new Sequelize({
                host: config.get('db.host'),
                port: config.get('db.port'),
                username: config.get('db.userName'),
                password: config.get('db.password'),
                database: config.get('db.database'),
                dialect: 'mysql',
                logging: false
               });
               await sequelize.sync({ alter: true })
               Logger.log('MYSQL CONNECTED SUCCESSFULLY');
               return sequelize;
            } catch (error: any) {
                Logger.error(`MYSQL CONNECTION ERROR :: ${error}`)
            }
        },
        inject: [ConfigService]
    }
]