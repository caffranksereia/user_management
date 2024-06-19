import { Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserManagement } from "./dto/user_management.dto";
import { UserManagementService } from "./user_management.service";
import { UpdateUserManagement } from "./dto/update_user_management.dto";

@Controller('user_management')
export class UserManagementController {
  constructor(private management: UserManagementService){}

  @Post()
  async register_user(data: CreateUserManagement){
    return this.management.register_user(data)
  }

  @Get()
  async users(){
    return this.management.users()
  }

  @Get(':id')
  async get_user(@Param('id') id:string){
    return this.management.get_user(id)
  }

  @Patch(':id')
  async update_user_profile(@Param('id') id:string, data: UpdateUserManagement){
    return this.management.update_user_profile(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id:string){
    return this.management.delete(id)
  }


}