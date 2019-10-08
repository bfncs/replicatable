import { union } from './util/set';

class TwoPhaseSet<T> {
  private addSet: Set<T>;
  private removeSet: Set<T>;

  public constructor() {
    this.addSet = new Set();
    this.removeSet = new Set();
  }

  public get value(): Set<T> {
    const result: Set<T> = new Set();
    this.addSet.forEach(item => {
      if (!this.removeSet.has(item)) {
        result.add(item);
      }
    });
    return result;
  }

  public add(item: T) {
    this.addSet.add(item);
  }

  public remove(item: T) {
    this.removeSet.add(item);
  }

  public merge(otherSet: TwoPhaseSet<T>) {
    this.addSet = union(this.addSet, otherSet.addSet);
    this.removeSet = union(this.removeSet, otherSet.removeSet);
  }
}

export default TwoPhaseSet;
