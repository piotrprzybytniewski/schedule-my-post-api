import { PostFlairs } from './post-flairs.vo';

describe('PostFlairs', () => {
  it('should create a valid post flairs', () => {
    const flairs = ['flair1', 'flair2', 'flair3'];
    const postFlairs = new PostFlairs({ flairs });

    expect(postFlairs.flairs).toEqual(flairs);
  });

  it('should throw an error when post flairs is empty', () => {
    const emptyFlairs = [];
    expect(() => new PostFlairs({ flairs: emptyFlairs })).toThrow();
  });

  it('should throw an error when post flairs has duplicates', () => {
    const duplicateFlairs = ['flair1', 'flair2', 'flair1'];
    expect(() => new PostFlairs({ flairs: duplicateFlairs })).toThrow();
  });
});
