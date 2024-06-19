import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from 'class-validator';
import { TypeUser } from 'src/enum/type_user.enum';

export class CreateUserManagement {
  @IsNotEmpty({message:'is not null'})
  @IsString()
  name: string;

  @IsNotEmpty({message:'is not null'})
  @IsString()
  nick_name: string;

  @IsNotEmpty({message:'is not null'})
  @IsString()
  cpf: string;

  @IsNotEmpty({message:'is not null'})
  @IsString()
  rg: string;

  @IsNotEmpty({message:'is not null'})
  @IsString()
  birth_date: Date;

  @IsNotEmpty({message:'is not null'})
  @IsString()
  age: number;

  @IsOptional()
  @Transform(({ value }) => ("" + value).toLowerCase())
  @IsEnum(
    TypeUser
  )
  type_user:TypeUser;


  @IsNotEmpty({message:'is not null'})
  @IsEmail()
  email: string;

  @IsNotEmpty({message:'is not null'})
  @IsString()
  cell_phone: string;

  @IsString()
  @IsNotEmpty({message:'is not null'})
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  @MaxLength(20)
  password: string;
}