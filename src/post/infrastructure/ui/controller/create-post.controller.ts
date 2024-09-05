import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/application/current-user.decorator';
import { User } from 'src/auth/application/user.dto';
import { API_POSTS_TAG } from 'src/constants';
import { ApiErrorResponse } from 'src/core/application/model/api/api-error-response.dto';
import { IdResponseDto } from 'src/core/application/model/api/id-response.dto';
import { CreatePostCommand } from 'src/post/application/create-post/create-post.command';
import { CreatePostDto } from 'src/post/application/create-post/create-post.dto';

@Controller('posts')
@ApiTags(API_POSTS_TAG)
@ApiBearerAuth()
export class CreatePostController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({
    summary: 'Create a new post draft',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: IdResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiErrorResponse })
  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User,
  ) {
    try {
      const aggregateId = await this.commandBus.execute(
        new CreatePostCommand({
          title: createPostDto.title,
          content: createPostDto.content,
          flairs: createPostDto.flairs,
          nsfw: createPostDto.nsfw,
          creatorId: user.id,
        }),
      );

      return new IdResponseDto(aggregateId);
    } catch (error) {
      console.log('createPost error', error);

      throw new BadRequestException(error.message);
    }
  }
}
