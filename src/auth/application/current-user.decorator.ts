import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { User } from './user.dto';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContextHost): User => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
