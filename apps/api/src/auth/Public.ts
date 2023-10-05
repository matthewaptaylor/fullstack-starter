import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Declare a route as public.
 * @returns Decorator function.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
