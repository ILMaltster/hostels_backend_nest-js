import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Каждый endpoint будет начинаться с профикса 'api'
  app.setGlobalPrefix('api');
  app.enableCors()
  await app.listen(process.env.PORT || 3030);
}
bootstrap();
