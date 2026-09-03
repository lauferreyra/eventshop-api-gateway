import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import type {
  Request,
  Response,
} from 'express';

import axios from 'axios';

@Catch()
export class HttpExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: unknown,
    host: ArgumentsHost,
  ) {
    const context =
      host.switchToHttp();

    const request =
      context.getRequest<Request>();

    const response =
      context.getResponse<Response>();

    const correlationId =
      request.header(
        'X-Correlation-ID',
      );

    /*
     * ==========================================
     * ERROR PROVENIENTE DE OTRO MICROSERVICIO
     * ==========================================
     */

    if (axios.isAxiosError(exception)) {
      const statusCode =
        exception.response?.status ??
        503;

      const message =
        exception.response?.data?.message ??
        'Microservice unavailable';

      response.status(statusCode).json({
        statusCode,
        message,
        path: request.url,
        correlationId,
        timestamp:
          new Date().toISOString(),
      });

      return;
    }

    /*
     * ==========================================
     * ERROR NORMAL DE NEST
     * ==========================================
     */

    if (exception instanceof HttpException) {
      const statusCode =
        exception.getStatus();

      const exceptionResponse =
        exception.getResponse();

      const message =
        typeof exceptionResponse ===
        'string'
          ? exceptionResponse
          : exceptionResponse;

      response.status(statusCode).json({
        statusCode,
        message,
        path: request.url,
        correlationId,
        timestamp:
          new Date().toISOString(),
      });

      return;
    }

    /*
     * ==========================================
     * ERROR DESCONOCIDO
     * ==========================================
     */

    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      path: request.url,
      correlationId,
      timestamp:
        new Date().toISOString(),
    });
  }
}