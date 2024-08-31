import { Result } from './result.dto';

describe('ResultDto', () => {
  it('should create an empty success result', () => {
    const result = Result.ok();

    expect(result.isOk()).toBe(true);
    expect(result.isFail()).toBe(false);
    expect(result.value()).toBeNull();
    expect(result.error()).toBeNull();
  });

  it('should create a success result with passed data', () => {
    const data = { name: 'John Doe' };
    const result = Result.ok(data);

    expect(result.isOk()).toBe(true);
    expect(result.isFail()).toBe(false);
    expect(result.value()).toEqual(data);
    expect(result.error()).toBeNull();
  });

  it('should create a fail result without passed error', () => {
    const result = Result.fail();

    expect(result.isOk()).toBe(false);
    expect(result.isFail()).toBe(true);
    expect(result.value()).toBeNull();
  });

  it('should create a fail result with passed error', () => {
    const error = 'Something went wrong!';
    const result = Result.fail(error);

    expect(result.isOk()).toBe(false);
    expect(result.isFail()).toBe(true);
    expect(result.value()).toBeNull();
    expect(result.error()).toEqual(error);
  });
});
