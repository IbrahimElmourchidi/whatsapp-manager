import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from 'env/env-schema';
import { AdminModule } from './admin/admin.module';
import { WaModule } from './wa/wa.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env/.env',
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    WaModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
