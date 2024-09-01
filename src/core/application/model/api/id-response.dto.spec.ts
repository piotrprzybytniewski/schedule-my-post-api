import { IdResponseDto } from './id-response.dto';

describe('IdResponseDto', () => {
  it('should create a valid id response object', () => {
    const id = '50d15135-4c00-454c-9177-9e1131cd996f';
    const idResponse = new IdResponseDto(id);

    expect(idResponse.id).toEqual(id);
  });

  it('should throw an error when id is empty', () => {
    expect(() => new IdResponseDto('')).toThrow();
  });
});
