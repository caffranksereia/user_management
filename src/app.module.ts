import { Module } from '@nestjs/common';
import { UserManagement } from './user_management/user_management.module';

@Module({
  imports: [UserManagement],
  controllers: [],
  providers: [],
})
export class AppModule {}
