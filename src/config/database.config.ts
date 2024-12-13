import { registerAs } from "@nestjs/config";
import { IDbConfig } from "src/interface/dbConfig";

export default registerAs<IDbConfig>('db', () => {
    return {
        port: Number(process.env.MYSQL_PORT),
        host: process.env.MYSQL_HOST,
        userName: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
})