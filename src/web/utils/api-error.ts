import { V1ApiTypes } from '@gmcsh/shared'
import { CustomError } from 'ts-custom-error'

export class ApiError extends CustomError {
  constructor(
    public statusCode: number,
    public error: V1ApiTypes.ErrorResponse,
    message?: string,
  ) {
    super(message)
  }
}
