import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error instanceof HttpException) {
      response.status(error.getStatus()).json({
        message: error.message,
        statusCode: error.getStatus(),
        timestamp: new Date().toISOString(),
      });
    } else {
      response.status(500).json({
        message: error.message,
        statusCode: 500,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
