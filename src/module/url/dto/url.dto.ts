import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ShortenURLDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  longUrl: string;
}
