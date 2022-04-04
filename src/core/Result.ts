/**
 * Some result, which is either a success or an error. This helps maintain type safety of errors
 * @param isSuccess is this result a success
 * @param error     the error associated with this result (must have isSuccess==false)
 * @param value     the value associated with this result (must have isSuccess==true)
 */
export class Result<T> {
  public isSuccess: boolean
  public isFailure: boolean
  public error: T | string | undefined
  private _value: T | undefined

  public constructor (isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error("InvalidOperation: A result cannot be successful and contain an error")
    }

    if (!isSuccess && !error) {
      throw new Error("InvalidOperation: A failing result needs to contain an error message")
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this.error = error
    this._value = value
  }

  /**
   * Get the value of this Result, provided the result is a success
   * @return the value of the Result
   * @throw Error if the Result is not a success
   */
  public getValue () : T {
    if (!this.isSuccess) {
      console.log(this.error,)
      throw new Error("Can't get the value of an error result. Use 'errorValue' instead.")
    }

    // In the case the result is a success but the value was not provided we must cast the
    // undefined value to the (intended) undefined type T before returning it
    return this._value as T
  }

  /**
   * Get the error from this Result
   * @return the error of the Result
   */
  public errorValue (): T {
    return this.error as T
  }

  /**
   * Creates a successful result with the given value
   * @param  value the value to embed in the result
   * @return a successful Result with the provided value
   */
  public static ok<U> (value?: U) : Result<U> {
    return new Result<U>(true, undefined, value)
  }
  /**
   * Creates an unsuccessful result with the given error
   * @param  error the error to embed in the result
   * @return an unsuccessful Result with the provided error embedded
   */
  public static fail<U> (error: any): Result<U> {
    return new Result<U>(false, error)
  }

  /**
   * Determines the overall success of a series of results
   * @param  results the results to check for success
   * @return         An failure Result found in results or a Success Result
   */
  public static combine (results: Result<any>[]) : Result<any> {
    for (let result of results) {
      if (result.isFailure) return result
    }
    return Result.ok()
  }
}
