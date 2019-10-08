import { union } from './util/set';

class GSet<T> {
  private items: Set<T>;

  public constructor() {
    this.items = new Set();
  }

  public get value(): Set<T> {
    return this.items;
  }

  public add(item: T) {
    this.items.add(item);
  }

  public merge(otherSet: GSet<T>) {
    this.items = union(this.items, otherSet.value);
  }
}

export default GSet;
