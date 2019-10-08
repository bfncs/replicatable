interface Timestamped<T> {
  value: T;
  lastModified: Date;
}

type Bias = 'add' | 'remove';

function lastWriteWinsMerge<T>(
  firstSet: Set<Timestamped<T>>,
  secondSet: Set<Timestamped<T>>
): Set<Timestamped<T>> {
  return new Set(
    Array.from(secondSet).reduce(
      (acc, currentItem) => [
        ...acc.filter(item => item.value !== currentItem.value),
        acc.find(
          item =>
            item.value === currentItem.value &&
            item.lastModified >= currentItem.lastModified
        ) || currentItem,
      ],
      Array.from(firstSet)
    )
  );
}

class LWWSet<T> {
  private bias: Bias;
  private addSet: Set<Timestamped<T>>;
  private removeSet: Set<Timestamped<T>>;

  public constructor(bias: Bias = 'add') {
    this.bias = bias;
    this.addSet = new Set();
    this.removeSet = new Set();
  }

  public get value(): Set<T> {
    const result: Set<T> = new Set();
    this.addSet.forEach(({ value, lastModified }) => {
      const removedItem = Array.from(this.removeSet).find(
        item =>
          item.value === value &&
          (item.lastModified > lastModified ||
            (this.bias === 'remove' && item.lastModified === lastModified))
      );
      if (!removedItem) {
        result.add(value);
      }
    });
    return result;
  }

  public add(item: T, timestamp: Date = new Date()) {
    this.addSet.add({
      value: item,
      lastModified: timestamp,
    });
  }

  public remove(item: T, timestamp: Date = new Date()) {
    this.removeSet.add({
      value: item,
      lastModified: timestamp,
    });
  }

  public merge(otherSet: LWWSet<T>) {
    this.addSet = lastWriteWinsMerge(this.addSet, otherSet.addSet);
    this.removeSet = lastWriteWinsMerge(this.removeSet, otherSet.removeSet);
  }
}

export default LWWSet;
