export interface IResultObject<T, D> {
  isOk: boolean;
  isFail: boolean;
  data: T | null;
  error: D | null;
}

export class Result<T = void, D = string> {
  private _isOk: Readonly<boolean>;
  private _isFail: Readonly<boolean>;
  private _data: Readonly<T | null>;
  private _error: Readonly<D | null>;

  private constructor(isSuccess: boolean, data?: T, error?: D) {
    this._isOk = isSuccess;
    this._isFail = !isSuccess;
    this._data = data ?? null;
    this._error = error ?? null;
  }

  public static ok<T, D = string>(data?: T): Result<T, D> {
    const _data = typeof data === 'undefined' ? null : data;
    const ok = new Result(true, _data, null) as unknown as Result<T, D>;
    return Object.freeze(ok) as Result<T, D>;
  }

  public static fail<D = string, T = void>(error?: D): Result<T, D> {
    const _error =
      typeof error !== 'undefined' && error !== null
        ? error
        : 'void error. no message!';
    const fail = new Result(false, null, _error) as unknown as Result<T, D>;
    return Object.freeze(fail) as Result<T, D>;
  }

  value(): T {
    return this._data as T;
  }

  error(): D {
    return this._error as D;
  }

  isFail(): boolean {
    return this._isFail;
  }

  isOk(): boolean {
    return this._isOk;
  }

  toObject(): IResultObject<T, D> {
    const metaData = {
      isOk: this._isOk,
      isFail: this._isFail,
      data: this._data as T | null,
      error: this._error as D | null,
    };

    return Object.freeze(metaData);
  }
}
