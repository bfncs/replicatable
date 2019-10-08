import LWWSet from '../src/LWWSet';

async function pause(timeoutMs: number = 0): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, timeoutMs);
  });
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

    await pause();

    set.remove('foo');
    expect(set.value).toEqual(new Set(['bar']));

    set.remove('bar');
    expect(set.value).toEqual(new Set());
  });

  it('readds removed item', async () => {
    const set = new LWWSet();

    set.add('foo');
    expect(set.value).toEqual(new Set(['foo']));

    await pause();
    set.remove('foo');
    expect(set.value).toEqual(new Set());

    await pause();
    set.add('foo');
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

  it('merges two set correctly', async () => {
    const firstSet = new LWWSet();
    const secondSet = new LWWSet();

    firstSet.add('foo');
    firstSet.add('baz');
    expect(firstSet.value).toEqual(new Set(['foo', 'baz']));

    await pause();
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
