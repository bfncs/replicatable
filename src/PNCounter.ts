import GCounter from './GCounter';

type PNCounterId = string;

class PNCounter {
  private positiveCounter: GCounter;
  private negativeCounter: GCounter;

  public constructor(id: PNCounterId) {
    this.positiveCounter = new GCounter(id);
    this.negativeCounter = new GCounter(id);
  }

  public get value() {
    return this.positiveCounter.value - this.negativeCounter.value;
  }

  public increment(amount: number) {
    this.positiveCounter.increment(amount);
  }

  public decrement(amount: number) {
    this.negativeCounter.increment(amount);
  }

  public merge(otherCounter: PNCounter) {
    this.positiveCounter.merge(otherCounter.positiveCounter);
    this.negativeCounter.merge(otherCounter.negativeCounter);
  }
}

export default PNCounter;
