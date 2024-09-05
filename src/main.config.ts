import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function mainConfig(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));

  app.enableCors({
    origin: [process.env.CLIENT_HOST],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('ScheduleMyPost API')
    .setDescription(
      'ScheduleMyPost API allows scheduling posts to Reddit at the best time to get more engagement!',
    )
    .setVersion('1.0')
    .addTag('posts')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
