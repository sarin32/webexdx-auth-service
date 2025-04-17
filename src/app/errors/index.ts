import HttpStatusCode from '../config/http-codes';

export class BaseError extends Error {
  statusCode: HttpStatusCode;
  errorCode: string | undefined;
  isToBeReported: boolean;
  constructor({
    statusCode,
    message,
    isToBeReported,
    errorCode,
  }: {
    statusCode: HttpStatusCode;
    message: string;
    isToBeReported: boolean;
    errorCode: undefined | string;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isToBeReported = isToBeReported;
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string, errorCode?: string) {
    super({
      message,
      errorCode,
      isToBeReported: false,
      statusCode: HttpStatusCode.BAD_REQUEST,
    });
  }
}

export class AuthorizationError extends BaseError {
  constructor(message: string, errorCode?: string) {
    super({
      message,
      errorCode,
      isToBeReported: false,
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}

export class ConflictError extends BaseError {
  constructor(message: string, errorCode?: string) {
    super({
      message,
      errorCode,
      isToBeReported: false,
      statusCode: HttpStatusCode.CONFLICT,
    });
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string, errorCode?: string) {
    super({
      message,
      errorCode,
      isToBeReported: false,
      statusCode: HttpStatusCode.FORBIDDEN,
    });
  }
}
