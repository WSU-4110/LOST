const { add, mul, sub, div } = require('../src/components/arith');

test.each([[1, 1, 1], [-1, 2, -2], [2, 2, 4]])(
    '%i * %i equals %i', (a, b, expected) => {
      expect(mul(a, b)).toBe(expected);
    },
  );
test('2 + 3 = 5', () => {
  expect(add(2, 3)).toBe(5);
});

test('3 * 4 = 12', () => {
  expect(mul(3, 4)).toBe(12);
});

test('5 - 6 = -1', () => {
  expect(sub(5, 6)).toBe(-1);
});

test('8 / 4 = 2', () => {
  expect(div(8, 4)).toBe(2);
});
test('2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });