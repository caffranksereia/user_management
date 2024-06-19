import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserManagement } from "./dto/user_management.dto";
import { UpdateUserManagement } from "./dto/update_user_management.dto";
import * as bcrt from 'bcrypt';
import { UserManageEntity } from "./entities/user_management.entity";
import { ReturnUserDto } from "./dto/returns/return_user_management.dto";
@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(UserManageEntity)
    private management_repo: Repository<UserManageEntity>,
){}

  async register_user(data: CreateUserManagement){
    data.password = await this.convertPassBcrypt(data.password);
     const user  = await this.management_repo.create(data)
     return await this.management_repo.save(user)
  }

  async users():Promise<UserManageEntity[]> {
    return this.management_repo.find()
  }

  async get_user( id:string):Promise<UserManageEntity>{
    return this.management_repo.findOneBy({id})
  }

  async update_user_profile( data: UpdateUserManagement,id:string){
    await this.get_user(id);
    await this.management_repo.update(id,data)
     return this.get_user(id);

  }

  async delete(id:string){
    return this.management_repo.delete(id)
  }


  async existsUserId(id: string) {
    const existUser = await this.get_user(id);
    if (!existUser) {
      throw new BadRequestException('is not exist ');
    }

    return existUser;
  }

  async convertPassBcrypt(pass: string) {
    const saltOrRounds = 10;

    return await bcrt.hash(pass, saltOrRounds);
  }

  async existUser(email: string) {
    const res = this.management_repo.exists({ where: { email } });
    if (!res) {
      throw new BadRequestException('Email exist');
    }
  }



}


