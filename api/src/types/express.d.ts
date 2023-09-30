import TokenPayload from '@/auth/TokenPayload';

declare global {
  namespace Express {
    export interface Request {
      user?: TokenPayload;
    }
  }
}
