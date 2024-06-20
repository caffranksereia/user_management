import { Module } from '@nestjs/common';
import { UserManagement } from './user_management/user_management.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserManageEntity } from './user_management/entities/user_management.entity';
import { AuthenticateModule } from './authenticate/authenticate.module';

@Module({
  imports: [ UserManagement,
    AuthenticateModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Mari0001',
    database: 'postgres',
    entities: [
      UserManageEntity,
    ],
    synchronize: true
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
