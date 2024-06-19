import { Module } from "@nestjs/common";
import { UserManagementController } from "./user_management.controller";
import { UserManagementService } from "./user_management.service";

@Module({
  imports:[],
  controllers:[UserManagementController],
  providers:[UserManagementService],

})
export class UserManagement {}