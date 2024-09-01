import { ApiProperty } from '@nestjs/swagger';

export class IdResponseDto {
  @ApiProperty({ example: '50d15135-4c00-454c-9177-9e1131cd996f' })
  readonly id: string;

  constructor(id: string) {
    if (!id) {
      throw new Error('Id cannot be empty');
    }

    this.id = id;
  }
}
