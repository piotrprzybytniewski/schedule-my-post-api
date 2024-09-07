import { BaseEntity } from './entity.base';

type TestEntityProps = {
  name: string;
  age: number;
};

class TestEntity extends BaseEntity<TestEntityProps> {
  protected _id: string;

  public validate(): void {
    if (this.props.age < 18) {
      throw new Error('Age cannot be less than 18');
    }
  }

  get name(): string {
    return this.props.name;
  }

  get age(): number {
    return this.props.age;
  }
}

describe('EntityBase', () => {
  it('should create a valid EntityBase instance with base properties', () => {
    const entity = new TestEntity({
      id: '111',
      props: {
        name: 'John',
        age: 20,
      },
    });

    expect(entity.id).toEqual('111');
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
    expect(entity.name).toEqual('John');
    expect(entity.age).toEqual(20);
  });

  it('should throw error when create an entity with invalid props', () => {
    expect(
      () =>
        new TestEntity({
          id: '111',
          props: {
            name: 'John',
            age: 17,
          },
        }),
    ).toThrow('Age cannot be less than 18');
  });
});
