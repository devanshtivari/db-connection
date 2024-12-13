import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import { LoggerModule } from 'nestjs-pino';
import loggerConfig from './logger-factory';
import { DatabaseModule } from 'src/database/database.module';
import databaseConfig from 'src/config/database.config';

export default function generateModuleSet() {
    const imports: ModuleMetadata['imports'] = [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [appConfig, databaseConfig],
        envFilePath: ['.env'],
      }),
      LoggerModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: loggerConfig,
      }),
      DatabaseModule,
    ];
    return imports;
}
  