import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  readonly content: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  readonly flairs: string[];

  @ApiProperty()
  @IsBoolean()
  readonly nsfw: boolean;
}
