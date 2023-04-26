import { Transform } from 'class-transformer';
import { UserRole } from 'src/common/enums/user.role';
import { IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  role: UserRole;
}
