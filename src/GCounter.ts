type GCounterId = string;
type GCounterMap = { [key: string]: number };

class GCounter {
  private id: GCounterId;
  private counters: GCounterMap;

  public constructor(id: GCounterId) {
    this.id = id;
    this.counters = {
      [id]: 0,
    };
  }

  public get value() {
    return Object.values(this.counters).reduce((acc, value) => acc + value, 0);
  }

  public increment(amount: number) {
    if (amount < 0) {
      throw new Error('Decreasing the counter is forbidden');
    }

    this.counters[this.id] += amount;
  }

  public merge(otherCounter: GCounter) {
    const nextCounters = Object.entries(otherCounter.counters).reduce(
      (acc, [id, value]) => ({
        ...acc,
        [id]: Math.max(acc[id] || 0, value),
      }),
      this.counters
    );
    this.counters = nextCounters;
  }
}

export default GCounter;
