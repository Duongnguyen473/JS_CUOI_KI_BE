import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  // const sequelize = app.get(Sequelize);
  // await sequelize.sync({ alter: true });
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api/');

  // Setup Swagger
  setupSwagger(app);

  const port = configService.get<number>('port');
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}/api/`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/`);
  console.log(`🔍 Health Check: http://localhost:${port}/api/health`);
}
bootstrap();
