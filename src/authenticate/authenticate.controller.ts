import { Body, Controller, Post, Put } from "@nestjs/common";
import { AuthenticateService } from "./authenticate.service";
import { AuthenticateDto } from "./dtos/authenticate.dto";
import { UserManagementService } from "src/user_management/user_management.service";
import { CreateUser } from "./dtos/create_user.dto";
import * as bcrt from 'bcrypt';
@Controller('auth')
export class AuthenticateController {
  constructor(
    private auth_service: AuthenticateService,
    private readonly userService:UserManagementService
  ){}

  @Post()
  async auth(@Body() data:AuthenticateDto){
    return this.auth_service.auth(data)
  }


  @Post('register_user')
  async register_user(@Body() data: CreateUser) {
    return this.userService.register_user(data);
  }
  
  @Post('forget')
  async forget_password(@Body() email:string) {
    return this.auth_service.forgetPassword(email)
  }

    @Put()
    async update_password(@Body() email:string, password:string){
      return this.auth_service.updatePassword(email, password)
    }

  

}