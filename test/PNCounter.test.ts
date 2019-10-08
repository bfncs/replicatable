import PNCounter from '../src/PNCounter';

describe('PNCounter', () => {
  it('constructs new counter with initial value 0', () => {
    const counter = new PNCounter('first');
    expect(counter.value).toEqual(0);
  });

  it('increments the counter', () => {
    const counter = new PNCounter('first');
    counter.increment(1);
    expect(counter.value).toEqual(1);
    counter.increment(3);
    expect(counter.value).toEqual(4);
  });

  it('decrements the counter', () => {
    const counter = new PNCounter('first');
    counter.increment(10);
    expect(counter.value).toEqual(10);
    counter.decrement(3);
    expect(counter.value).toEqual(7);
    counter.decrement(7);
    expect(counter.value).toEqual(0);
  });

  it('merges two counters correctly', () => {
    const firstCounter = new PNCounter('first');
    firstCounter.decrement(4);
    expect(firstCounter.value).toEqual(-4);

    const secondCounter = new PNCounter('second');
    secondCounter.increment(6);
    expect(secondCounter.value).toEqual(6);

    firstCounter.merge(secondCounter);
    expect(firstCounter.value).toEqual(2);
    expect(secondCounter.value).toEqual(6);

    secondCounter.merge(firstCounter);
    expect(firstCounter.value).toEqual(2);
    expect(secondCounter.value).toEqual(2);
  });
});
