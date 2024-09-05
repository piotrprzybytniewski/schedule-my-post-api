import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let reflector: Reflector;
  let context: ExecutionContext;

  beforeEach(() => {
    reflector = new Reflector();
    jwtAuthGuard = new JwtAuthGuard(reflector);
    context = {
      getHandler: () => {},
      getClass: () => {},
    } as ExecutionContext;
  });

  it('should allow public access to routes marked with isPublic decorator', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(true);

    expect(jwtAuthGuard.canActivate(context)).toBe(true);
  });
});
