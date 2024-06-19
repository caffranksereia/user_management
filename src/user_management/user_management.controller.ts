import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserManagement } from "./dto/user_management.dto";
import { UserManagementService } from "./user_management.service";
import { UpdateUserManagement } from "./dto/update_user_management.dto";
import { ReturnUserDto } from "./dto/returns/return_user_management.dto";
import { UserManageEntity } from "./entities/user_management.entity";

@Controller('user_management')
export class UserManagementController {
  constructor(private management: UserManagementService){}

  @Post()
  async register_user(@Body()data: CreateUserManagement){
    return this.management.register_user(data)
  }

  @Get()
  async users():Promise<ReturnUserDto[]>{
    return  (await this.management.users()).map(
      (userEntity) => new ReturnUserDto(userEntity),)
  }

  @Get(':id')
  async get_user(@Param('id') id:string):Promise<UserManageEntity>{
    return this.management.get_user(id)
  }

  @Patch(':id')
  async update_user_profile(@Param('id') id:string, @Body() data: UpdateUserManagement){
    return this.management.update_user_profile(data,id)
  }

  @Delete(':id')
  async delete(@Param('id') id:string){
    return this.management.delete(id)
  }


}