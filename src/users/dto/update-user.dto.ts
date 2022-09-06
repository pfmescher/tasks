import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  pass: string;
}
