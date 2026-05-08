import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // 允许来自这个地址的请求
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE", // 允许的 HTTP 方法
  });

  await app.listen(30001);
  console.log('API server is running on http://localhost:30001');
}
bootstrap();
