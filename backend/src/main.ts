import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Terço Hoje API')
    .setDescription('API para o aplicativo Você Já Rezou o Terço Hoje?')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticação')
    .addTag('users', 'Usuários')
    .addTag('checkins', 'Check-ins de oração')
    .addTag('prayers', 'Pedidos de oração')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🙏 Terço Hoje API rodando em http://localhost:${port}`);
  console.log(`📚 Documentação Swagger: http://localhost:${port}/api/docs`);
}

bootstrap();
