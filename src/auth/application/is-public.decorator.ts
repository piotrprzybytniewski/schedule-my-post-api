import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = Symbol('IsPublic');

/**
 * Mark a route as public
 */
export const isPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
