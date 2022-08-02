import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';

@Module({
  controllers: [AdminController],
  imports: [],
  exports: [],
  providers: [],
})
export class AdminModule {}
