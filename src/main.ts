import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger';
import { URL_SWAGGER } from './core/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config_service = app.get(ConfigService);
  const logger = new Logger(bootstrap.name);
  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const port_env = config_service.get('PORT');
  console.log(port_env);
  logger.debug(`http://localhost:${port_env}/${URL_SWAGGER}`);
  await app.listen(port_env);
}
bootstrap();
