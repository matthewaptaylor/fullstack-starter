import { Request } from 'express';
import TokenPayload from '@/auth/TokenPayload';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}
