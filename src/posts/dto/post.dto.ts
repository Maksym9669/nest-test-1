import { IsNotEmpty, IsString } from 'class-validator';

export class PostDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
