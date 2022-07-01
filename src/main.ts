import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Medical Appointments API')
    .setDescription('Medical Appointments API description')
    .setVersion('1.0')
    .addTag('medical-appointments')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document, {
    explorer: true,
    swaggerOptions: { showRequestDuration: true },
  });

  await app.listen(3000);
}
bootstrap();
