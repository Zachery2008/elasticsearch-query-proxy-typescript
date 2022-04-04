import { UseCaseError } from '../../core/UseCaseError'
import { Result } from '../../core/Result'

export namespace UseCaseErrors {
  export class FailedGetRequest extends Result<UseCaseError> {
    public constructor (err: string) {
      super(false, {
        message: `Failed to retrieve indices metadata with error: ${err}.`
      } as UseCaseError)
    }
  }
}