import { ValueObject } from './value-object';

interface TestValueObjectProps {
  name: string;
  age: number;
}
class TestValueObject extends ValueObject<TestValueObjectProps> {
  protected validate(props: TestValueObjectProps): void {
    if (props.name === 'test') {
      throw new Error('Name cannot be test');
    }

    if (props.age < 18) {
      throw new Error('Age cannot be less than 18');
    }
  }
}

describe('ValueObject', () => {
  it('should create a validated Value Object', () => {
    const valueObject = new TestValueObject({
      name: 'john',
      age: 20,
    });

    expect(valueObject.equals(valueObject)).toBe(true);
    // expect(valueObject)
  });

  it('should throw error when create invalid Value Object', () => {
    expect(
      () =>
        new TestValueObject({
          name: 'test',
          age: 20,
        }),
    ).toThrow('Name cannot be test');

    expect(
      () =>
        new TestValueObject({
          name: 'john',
          age: 17,
        }),
    ).toThrow('Age cannot be less than 18');
  });
});
