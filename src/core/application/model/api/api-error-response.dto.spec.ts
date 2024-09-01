import { HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from './api-error-response.dto';

describe('ApiErrorResponse', () => {
  it('should create a valid api error response object', () => {
    const apiErrorResponse = new ApiErrorResponse({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation failed',
      error: 'Bad Request',
    });

    expect(apiErrorResponse.message).toEqual('Validation failed');
    expect(apiErrorResponse.error).toEqual('Bad Request');
    expect(apiErrorResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
});
