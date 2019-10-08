interface LWWSetItem<T> {
  value: T;
  lastModified: Date;
}

function lastWriteWinsMerge<T>(
  firstSet: Set<LWWSetItem<T>>,
  secondSet: Set<LWWSetItem<T>>
): Set<LWWSetItem<T>> {
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
  private addSet: Set<LWWSetItem<T>>;
  private removeSet: Set<LWWSetItem<T>>;

  public constructor() {
    this.addSet = new Set();
    this.removeSet = new Set();
  }

  public get value(): Set<T> {
    const result: Set<T> = new Set();
    this.addSet.forEach(({ value, lastModified }) => {
      const removedItem = Array.from(this.removeSet).find(
        item => item.value === value && item.lastModified > lastModified
      );
      if (!removedItem) {
        result.add(value);
      }
    });
    return result;
  }

  public add(item: T) {
    this.addSet.add({
      value: item,
      lastModified: new Date(),
    });
  }

  public remove(item: T) {
    this.removeSet.add({
      value: item,
      lastModified: new Date(),
    });
  }

  public merge(otherSet: LWWSet<T>) {
    this.addSet = lastWriteWinsMerge(this.addSet, otherSet.addSet);
    this.removeSet = lastWriteWinsMerge(this.removeSet, otherSet.removeSet);
  }
}

export default LWWSet;
