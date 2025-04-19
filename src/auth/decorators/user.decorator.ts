import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: any = context.switchToHttp().getRequest<Request>();
    return request.user;
  },
);
