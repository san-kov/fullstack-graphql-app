import { ValidationError } from 'class-validator'
import { ArgumentValidationError } from 'type-graphql'

interface CustomError {
  path: string
  message: string
}

export const formatErrors = (errors: CustomError[]): ArgumentValidationError =>
  new ArgumentValidationError(
    errors.map<ValidationError>(error => {
      let valErr = new ValidationError()

      valErr.property = error.path
      valErr.constraints = {
        [error.path]: error.message
      }

      return valErr
    })
  )
