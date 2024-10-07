import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './middleware/logging.middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware untuk logging
  app.use(new LoggingMiddleware().use);

  // Mengaktifkan CORS
  app.enableCors();

  // Mendengarkan pada port 3002 di localhost
  await app.listen(3002, '127.0.0.1');
}

bootstrap();
