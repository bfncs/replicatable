import TwoPhaseSet from '../src/TwoPhaseSet';

describe('TwoPhaseSet', () => {
  it('constructs new empty set', () => {
    const set = new TwoPhaseSet();
    expect(set.value).toEqual(new Set());
  });

  it('adds item', () => {
    const set = new TwoPhaseSet();

    set.add('foo');
    expect(set.value).toEqual(new Set(['foo']));

    set.add('bar');
    expect(set.value).toEqual(new Set(['foo', 'bar']));
  });

  it('removes item', () => {
    const set = new TwoPhaseSet();

    set.add('foo');
    set.add('bar');
    expect(set.value).toEqual(new Set(['foo', 'bar']));

    set.remove('foo');
    expect(set.value).toEqual(new Set(['bar']));

    set.remove('bar');
    expect(set.value).toEqual(new Set());
  });

  it('should tolerate adding item twice', () => {
    const set = new TwoPhaseSet();

    set.add('foo');
    expect(set.value).toEqual(new Set(['foo']));

    set.add('foo');
    expect(set.value).toEqual(new Set(['foo']));
  });

  it('should tolerate removing before adding item', () => {
    const set = new TwoPhaseSet();

    set.remove('foo');
    expect(set.value).toEqual(new Set());

    set.add('foo');
    expect(set.value).toEqual(new Set());
  });

  it('merges two set correctly', () => {
    const firstSet = new TwoPhaseSet();
    const secondSet = new TwoPhaseSet();

    firstSet.add('foo');
    firstSet.add('baz');
    expect(firstSet.value).toEqual(new Set(['foo', 'baz']));

    secondSet.add('bar');
    secondSet.remove('baz');
    expect(secondSet.value).toEqual(new Set(['bar']));

    firstSet.merge(secondSet);
    expect(firstSet.value).toEqual(new Set(['foo', 'bar']));
    expect(secondSet.value).toEqual(new Set(['bar']));

    secondSet.merge(firstSet);
    expect(firstSet.value).toEqual(new Set(['foo', 'bar']));
    expect(secondSet.value).toEqual(new Set(['foo', 'bar']));
  });
});
