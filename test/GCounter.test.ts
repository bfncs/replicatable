import GCounter from '../src/GCounter';

describe('GCounter', () => {
  it('constructs new counter with initial value 0', () => {
    const counter = new GCounter('first');
    expect(counter.value).toEqual(0);
  });

  it('increments the counter', () => {
    const counter = new GCounter('first');
    counter.increment(1);
    expect(counter.value).toEqual(1);
    counter.increment(3);
    expect(counter.value).toEqual(4);
  });

  it('throws error on trying to decrease the counter', () => {
    const counter = new GCounter('first');
    expect(() => {
      counter.increment(-1);
    }).toThrow();
  });

  it('merges two counters correctly', () => {
    const firstCounter = new GCounter('first');
    firstCounter.increment(3);
    expect(firstCounter.value).toEqual(3);

    const secondCounter = new GCounter('second');
    secondCounter.increment(7);
    expect(secondCounter.value).toEqual(7);

    firstCounter.merge(secondCounter);
    expect(firstCounter.value).toEqual(10);
    expect(secondCounter.value).toEqual(7);

    secondCounter.merge(firstCounter);
    expect(firstCounter.value).toEqual(10);
    expect(secondCounter.value).toEqual(10);
  });
});
