import LWWSet from '../src/LWWSet';

function tick(timestamp: Date = new Date()) {
  return new Date(timestamp.getTime() + 1);
}

describe('LWWSet', () => {
  it('constructs new empty set', () => {
    const set = new LWWSet();
    expect(set.value).toEqual(new Set());
  });

  it('adds item', () => {
    const set = new LWWSet();

    set.add('foo');
    expect(set.value).toEqual(new Set(['foo']));

    set.add('bar');
    expect(set.value).toEqual(new Set(['foo', 'bar']));
  });

  it('removes item', async () => {
    const set = new LWWSet();

    set.add('foo');
    set.add('bar');
    expect(set.value).toEqual(new Set(['foo', 'bar']));

    const deleteTimestamp = tick();

    set.remove('foo', deleteTimestamp);
    expect(set.value).toEqual(new Set(['bar']));

    set.remove('bar', deleteTimestamp);
    expect(set.value).toEqual(new Set());
  });

  it('reads removed item', async () => {
    const set = new LWWSet();

    set.add('foo');
    expect(set.value).toEqual(new Set(['foo']));

    const deleteTimestamp = tick();
    set.remove('foo', deleteTimestamp);
    expect(set.value).toEqual(new Set());

    const readdTimestamp = tick(deleteTimestamp);
    set.add('foo', readdTimestamp);
    expect(set.value).toEqual(new Set(['foo']));
  });

  it('should tolerate adding item twice', () => {
    const set = new LWWSet();

    set.add('foo');
    expect(set.value).toEqual(new Set(['foo']));

    set.add('foo');
    expect(set.value).toEqual(new Set(['foo']));
  });

  it('should ignore removing before adding item', () => {
    const set = new LWWSet();

    set.remove('foo');
    expect(set.value).toEqual(new Set());

    set.add('foo');
    expect(set.value).toEqual(new Set(['foo']));
  });

  it('favors adds at the same time with default add bias', () => {
    const set = new LWWSet();
    const timestamp = new Date();

    set.add('foo', timestamp);
    set.remove('foo', timestamp);

    expect(set.value).toEqual(new Set(['foo']));
  });

  it('favors removals at the same time with remove bias', () => {
    const set = new LWWSet('remove');
    const timestamp = new Date();

    set.add('foo', timestamp);
    set.remove('foo', timestamp);

    expect(set.value).toEqual(new Set());
  });

  it('merges two set correctly', async () => {
    const firstSet = new LWWSet();
    const secondSet = new LWWSet();

    firstSet.add('foo');
    firstSet.add('baz');
    expect(firstSet.value).toEqual(new Set(['foo', 'baz']));

    const secondSetTimestamp = tick();
    secondSet.add('bar', secondSetTimestamp);
    secondSet.remove('baz', secondSetTimestamp);
    expect(secondSet.value).toEqual(new Set(['bar']));

    firstSet.merge(secondSet);
    expect(firstSet.value).toEqual(new Set(['foo', 'bar']));
    expect(secondSet.value).toEqual(new Set(['bar']));

    secondSet.merge(firstSet);
    expect(firstSet.value).toEqual(new Set(['foo', 'bar']));
    expect(secondSet.value).toEqual(new Set(['foo', 'bar']));
  });
});
