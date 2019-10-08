export function union<T>(...sets: Set<T>[]): Set<T> {
  const result: Set<T> = new Set();

  for (let set of sets)
    set.forEach(item => {
      result.add(item);
    });

  return result;
}
