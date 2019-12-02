const {
  isNumber,
  castToNumber,
  getCaster,
  isString,
  castToString
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });
    it('properly tells if a value is a string', () => {
      expect(isString('hi')).toBeTruthy();
      expect(isString('hello, my name is willow')).toBeTruthy();
      expect(isString('5')).toBeTruthy();
      expect(isString('false')).toBeTruthy();
      expect(isString(5)).toBeFalsy();
      expect(isString(true)).toBeFalsy();
      expect(isString([])).toBeFalsy();
    });
  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });
    it('can cast values to a string', () => {
      expect(castToString('hi')).toEqual('hi');
      expect(castToString('hello, my name is willow')).toEqual('hello, my name is willow');
      expect(castToString(5)).toEqual('5');
      expect(castToString(false)).toEqual('false');
    });
    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(Promise)).toBeNull();
  });
});
