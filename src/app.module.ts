import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from 'env/env-schema';
import { WaModule } from './wa/wa.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env/.env',
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    WaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
