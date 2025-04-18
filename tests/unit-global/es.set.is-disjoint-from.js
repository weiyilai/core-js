import { createIterable, createSetLike } from '../helpers/helpers.js';

QUnit.test('Set#isDisjointFrom', assert => {
  const { isDisjointFrom } = Set.prototype;

  assert.isFunction(isDisjointFrom);
  assert.arity(isDisjointFrom, 1);
  assert.name(isDisjointFrom, 'isDisjointFrom');
  assert.looksNative(isDisjointFrom);
  assert.nonEnumerable(Set.prototype, 'isDisjointFrom');

  assert.true(new Set([1]).isDisjointFrom(new Set([2])));
  assert.false(new Set([1]).isDisjointFrom(new Set([1])));
  assert.true(new Set([1, 2, 3]).isDisjointFrom(new Set([4, 5, 6])));
  assert.false(new Set([1, 2, 3]).isDisjointFrom(new Set([5, 4, 3])));
  assert.true(new Set([1]).isDisjointFrom(createSetLike([2])));
  assert.false(new Set([1]).isDisjointFrom(createSetLike([1])));
  assert.true(new Set([1, 2, 3]).isDisjointFrom(createSetLike([4, 5, 6])));
  assert.false(new Set([1, 2, 3]).isDisjointFrom(createSetLike([5, 4, 3])));

  // TODO: drop from core-js@4
  assert.true(new Set([1]).isDisjointFrom([2]));
  assert.false(new Set([1]).isDisjointFrom([1]));
  assert.true(new Set([1, 2, 3]).isDisjointFrom([4, 5, 6]));
  assert.false(new Set([1, 2, 3]).isDisjointFrom([5, 4, 3]));
  assert.true(new Set([1]).isDisjointFrom(createIterable([2])));
  assert.false(new Set([1]).isDisjointFrom(createIterable([1])));

  assert.false(new Set([42, 43]).isDisjointFrom({
    size: Infinity,
    has() {
      return true;
    },
    keys() {
      throw new Error('Unexpected call to |keys| method');
    },
  }));

  assert.throws(() => new Set().isDisjointFrom({
    size: -Infinity,
    has() {
      return true;
    },
    keys() {
      throw new Error('Unexpected call to |keys| method');
    },
  }));

  assert.throws(() => new Set([1, 2, 3]).isDisjointFrom(), TypeError);
  assert.throws(() => isDisjointFrom.call({}, [1, 2, 3]), TypeError);
  assert.throws(() => isDisjointFrom.call(undefined, [1, 2, 3]), TypeError);
  assert.throws(() => isDisjointFrom.call(null, [1, 2, 3]), TypeError);
});
