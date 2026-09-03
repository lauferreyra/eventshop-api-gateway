import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import type {
  Request,
  Response,
  NextFunction,
} from 'express';

import { randomUUID } from 'crypto';

@Injectable()
export class CorrelationIdMiddleware
  implements NestMiddleware
{
  use(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const correlationId =
      request.header(
        'X-Correlation-ID',
      ) ?? randomUUID();

    request.headers[
      'x-correlation-id'
    ] = correlationId;

    response.setHeader(
      'X-Correlation-ID',
      correlationId,
    );

    next();
  }
}