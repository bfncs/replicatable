import GSet from '../src/GSet';

describe('GSet', () => {
  it('constructs new empty set', () => {
    const set = new GSet();
    expect(set.value).toEqual(new Set());
  });

  it('adds item', () => {
    const set = new GSet();

    set.add('foo');
    expect(set.value).toEqual(new Set(['foo']));

    set.add('bar');
    expect(set.value).toEqual(new Set(['foo', 'bar']));
  });

  it('merges two set correctly', () => {
    const firstSet = new GSet();
    const secondSet = new GSet();

    firstSet.add('foo');
    expect(firstSet.value).toEqual(new Set(['foo']));

    secondSet.add('bar');
    expect(secondSet.value).toEqual(new Set(['bar']));

    firstSet.merge(secondSet);
    expect(firstSet.value).toEqual(new Set(['foo', 'bar']));
    expect(secondSet.value).toEqual(new Set(['bar']));

    secondSet.merge(firstSet);
    expect(firstSet.value).toEqual(new Set(['foo', 'bar']));
    expect(secondSet.value).toEqual(new Set(['foo', 'bar']));
  });
});
