import PriorityQueue from './priority-queue';

test('test size', () => {
  let pq = new PriorityQueue();
  pq.push(5);
  expect(pq.size()).toBe(1);
});

test('test asscending power priority queue', () => {
  let pq = new PriorityQueue((a, b) => a > b);
  pq.push(...[ 5, 6, 9, 1, 7 ]);
  expect(pq.pop()).toBe(9);
  expect(pq.pop()).toBe(7);
});

test('test descending power priority queue', () => {
  let pq = new PriorityQueue((a, b) => a < b);
  pq.push(...[ 5, 6, 9, 1, 7 ]);
  expect(pq.peek()).toBe(1);
  pq.pop();
  pq.pop();
  expect(pq.peek()).toBe(6);
});

