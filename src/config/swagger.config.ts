import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(app: INestApplication): void {
  const configService = app.get(ConfigService);
  
  // Cấu hình Swagger đơn giản
  const config = new DocumentBuilder()
    .setTitle('Cong Gia Su API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // Tạo document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI đơn giản
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = configService.get('port', 3000);
  console.log(`📚 Swagger: http://localhost:${port}/api/docs`);
}
