import { Module } from "@nestjs/common";
import { UserManagementController } from "./user_management.controller";
import { UserManagementService } from "./user_management.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserManageEntity } from "./entities/user_management.entity";

@Module({
  imports:[TypeOrmModule.forFeature([UserManageEntity])],
  controllers:[UserManagementController],
  providers:[UserManagementService],

})
export class UserManagement {}