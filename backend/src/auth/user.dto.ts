import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserPayloadDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
export class UserDto extends UserPayloadDto {
  @IsString()
  @IsOptional()
  name?: string;
}
