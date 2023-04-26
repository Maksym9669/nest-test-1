import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @Expose()
  title: string;

  @IsOptional()
  @IsString()
  @Expose()
  description: string;
}
