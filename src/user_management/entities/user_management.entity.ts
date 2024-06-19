import { minLength } from "class-validator";
import { TypeUser } from "src/enum/type_user.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Entity({name:'user_management'})
export class UserManagemEntity {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column({ nullable: false,  length: 200, })
  name: string;

  @Column({
    type:"enum",
    enum:TypeUser,
    default:TypeUser.GHOST
  })
  type_user:TypeUser;

  @Column({ nullable: false, name:'nick_name',  unique: true, })
  nick_name: string;

  @Column({ nullable: false, name:'cpf' , unique: true,})
  cpf: string;

  @Column({ nullable: false, name:'rg', unique: true,})
  rg: string;

  @Column({ nullable: false, name:'birth_date' })
  birth_date: Date;

  @Column({ nullable: false, name:'age' })
  age: number;

  @Column({ nullable: false , name:'email',  unique: true,})
  email: string;

  @Column({ nullable: false,  unique: true, })
  cell_phone: string
  
  @Column({ nullable: false ,length:6 ,  unique: true,})
  password: string;

  
}