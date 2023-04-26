import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AuthMiddleware } from './auth/auth.middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const authMiddleware = new AuthMiddleware();

  app.use(authMiddleware.use.bind(authMiddleware));

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
