import { registerAs } from '@nestjs/config';
import { IAppConfig } from 'src/interface/appConfig';

export default registerAs<IAppConfig>('app', () => {
    return {
        projectName: process.env.PROJECT_NAME,
        logLevel: process.env.LOG_LEVEL,
        allowedOrigin: process.env.ALLOWED_ORIGIN,
        port: Number(process.env.PORT)
    }
})