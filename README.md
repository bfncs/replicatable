# replicatable

Library of CRDTs (Conflict-free replicated data types) implemented in TypeScript

## Implemented Types

### Convergent replicated data types (CvRDTs), state based

CvRDTs are replicated by sending the full local state to other replicas and calling the commutative, associative and idempotent `merge` function.

#### `GCounter`

The `GCounter` (Grow-only-Counter) is a counter that can only be incremented on `n` nodes. Each node needs to be assigned a cluster-wide unique ID.

```typescript
import { GCounter } from "replicatable";
const firstCounter = new GCounter('first');
firstCounter.increment(3);

const secondCounter = new GCounter('second');
secondCounter.increment(7);

firstCounter.merge(secondCounter);

console.log(firstCounter.value); // 10
```

#### `PNCounter`

The `PNCounter` (Positive-Negative-Counter) combines two `GCounter` instances, one for increments and one for decrements.

```typescript
import { PNCounter } from "replicatable";
const firstCounter = new PNCounter('first');
firstCounter.decrement(4);

const secondCounter = new PNCounter('second');
secondCounter.increment(6);

firstCounter.merge(secondCounter);

console.log(firstCounter.value); // 2
```

#### `GSet`

The `GSet` (Grow-only-Set) is a set that only allows adds.

```typescript
import { GSet } from "replicatable";
const firstSet = new GSet();
firstSet.add('foo');

const secondSet = new GSet();
secondSet.add('bar');

firstSet.merge(secondSet);
console.log(firstSet) // Set(['foo', 'bar'])
```

#### `TwoPhaseSet`

The `TwoPhaseSet` is a set that only allows elements to be added and removed. It combines two `GSets` for additins and removals.

```typescript
import { TwoPhaseSet } from "replicatable";
const firstSet = new TwoPhaseSet();
firstSet.add('foo');
firstSet.add('baz');

const secondSet = new TwoPhaseSet();
secondSet.add('bar');
secondSet.remove('baz');

firstSet.merge(secondSet);
console.log(firstSet) // Set(['foo', 'bar'])
```


## Prior Work

* [barend-erasmus/pangolin](https://github.com/barend-erasmus/pangolin)
* [orbitdb/crdts](https://github.com/orbitdb/crdts)
* [ljwagerfield/crdt](https://github.com/ljwagerfield/crdt)
* [pfrazee/crdt_notes](https://github.com/pfrazee/crdt_notes)