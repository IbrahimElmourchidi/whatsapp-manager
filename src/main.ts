import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';

import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const helpers = {
    ind: (val: any) => val + 1,
  };
  app.useStaticAssets(join(process.cwd(), 'src/admin/public'));
  app.setBaseViewsDir(join(process.cwd(), 'src/admin/views'));
  app.set('view options', { layout: 'base' });
  app.set('helpers', helpers);
  app.setViewEngine('hbs');

  const port = process.env.PORT || 5555;
  await app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}
bootstrap();
