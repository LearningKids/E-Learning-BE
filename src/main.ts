import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config_service = app.get(ConfigService);
  const logger = new Logger(bootstrap.name);

  const config = new DocumentBuilder()
    .setTitle('E-Learning')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  const port_env = config_service.get('PORT');
  logger.debug(`http://localhost:${port_env}/swagger/api`);

  await app.listen(port_env),
    () => {
      logger.debug(`http://localhost:${port_env}/swagger/api`);
    };
}
bootstrap();
