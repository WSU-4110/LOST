const { add, mul } = require('../src/components/arith');

test.each([[1, 1, 1], [-1, 2, -2], [2, 2, 4]])(
    '%i * %i equals %i', (a, b, expected) => {
      expect(mul(a, b)).toBe(expected);
    },
  );

test('1+ 4 = 5', () => {
    expect(add(1, 4)).toBe(5);
  });