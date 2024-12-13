import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as hpp from 'hpp';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function main(): Promise<INestApplication> {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.use(
    bodyParser.urlencoded({
      extended: false, //Returns middleware that only parses urlencoded bodies, this parser accepts only UTF-8 encoding of the body
    }),
  );

  app.use(bodyParser.json()); //Returns middleware that only parses json

  app.use(hpp()); //Express middleware to protect against HTTP Parameter Pollution attacks

  app.use(cookieParser()); // parse Cookie header and populate req.cookies with an object keyed by the cookie names.

  app.use(
    helmet({
      //setup security headers sent as response, to prevent exposing sensitive information
      contentSecurityPolicy: true, // Disable Helmet's CSP to use the manually configured one.
      hsts: {
        // configuring HTTP Strict Transport Security to ensure proper setting of headers
        maxAge: 31536000, // One year in seconds
        includeSubDomains: true, //ensuring all properties imply to subdomains as well
        preload: true, //ensuring the properties are implemented at time of preloading
      },
      referrerPolicy: { policy: 'same-origin' }, // customizing the information inside referrer header
    }),
  );

  app.use(compression()); //For high-traffic websites in production, it is strongly recommended to offload compression from the application server - typically in a reverse proxy (e.g., Nginx). In that case, you should not use compression middleware.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const firstError = errors[0];
        const errorMessage = firstError.constraints[Object.keys(firstError.constraints)[0]];
        return new HttpException({ error: true, message: errorMessage, status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
      },
    }),
  );
  //cors configurations
  const configService: ConfigService<any, false> = app.get(ConfigService<any>);

  app.enableCors();

  await app.listen(configService.getOrThrow<number>('app.port', { infer: true }));

  Logger.log(`Server running on ${await app.getUrl()}`);

  return app;
}

void main();
