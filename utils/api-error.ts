import { ErrorData } from '@types'
import { CustomError } from 'ts-custom-error'

export class ApiError extends CustomError {
  constructor(
    public statusCode: number,
    public error: ErrorData,
    message?: string,
  ) {
    super(message)
  }
}
