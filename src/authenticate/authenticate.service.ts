import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserManagementService } from "src/user_management/user_management.service";
import { AuthenticateDto } from "./dtos/authenticate.dto";
import { Repository } from "typeorm";
import { UserManageEntity } from "src/user_management/entities/user_management.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { LoginPayload } from "./dtos/login-payload.dto";
import { ReturnUserDto } from "src/user_management/dto/returns/return_user_management.dto";

@Injectable()
export class AuthenticateService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserManageEntity)
    private user_repo: Repository<UserManageEntity>
  ){}


  async auth({email,password}: AuthenticateDto){
    
    
    const user = await this.user_repo.findOneBy({
      email
    });
    console.log(user);
    console.log(password);
  
    const comparehash =await  bcrypt.compare(password,user.password );

    if ( !user||!comparehash || user&&comparehash === null) {
      
      throw new UnauthorizedException('Email or password incorrect');
    }
    return {
      accessToken: this.jwtService.sign({
        ...new LoginPayload(user),
      
      }),
      user: new ReturnUserDto(user),
    };
  }


  async forgetPassword(email:string){
    const user = await this.user_repo.findOneBy({
      email,
    });
    const new_password = this.generatePassword()
    return new_password;
  }

  async updatePassword(email:string, password:string ){
    const user = await this.user_repo.findOneBy({
      email
    });

    password = await this.convertPassBcrypt(password);
    console.log(password)
     await this.user_repo.update(user.id, {password})
     
  }

  async generatePassword() {
    const randon_password =  await Math.random().toString(36).substring(0, 8);
    return randon_password;
  }

  async convertPassBcrypt(pass: string) {
    const saltOrRounds = 10;

    return await bcrypt.hash(pass, saltOrRounds);
  }
}
