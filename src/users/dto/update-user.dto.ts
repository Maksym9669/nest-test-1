import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Expose()
  username: string;

  @IsOptional()
  @IsString()
  @Expose()
  firstname: string;

  @IsOptional()
  @IsString()
  @Expose()
  lastname: string;
}
