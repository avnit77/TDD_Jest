const {
  isNumber,
  castToNumber,
  getCaster,
  isString,
  castToString,
  isBoolean,
  castToBoolean,
  isArray,
  castToArray,
  isObject
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
    it('properly tells if a value is a boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean('hi')).toBeFalsy();
      expect(isBoolean(5)).toBeFalsy();
      expect(isBoolean('false')).toBeFalsy();
    });
    it('properly tells if a value is an array', () => {
      expect(isArray([1])).toBeTruthy();
      expect(isArray([2, 4, 7])).toBeTruthy();
      expect(isArray(['cat', 'dog', 'bird'])).toBeTruthy();
      expect(isArray(6)).toBeFalsy();
      expect(isArray('yes')).toBeFalsy();
    });
    it('properly tells if a value is an object', () => {
      expect(isObject({})).toBeTruthy();
      expect(isObject({ 'type': 'cat' })).toBeTruthy();
      expect(isObject({ 'type': 'cat', 'name': 'willow' })).toBeTruthy();
      expect(isObject(5)).toBeFalsy();
      expect(isObject('cat')).toBeFalsy();
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
    it('can cast values to a boolean', () => {
      expect(castToBoolean('true')).toEqual(true);
      expect(castToBoolean(0)).toEqual(false);
      expect(castToBoolean('1')).toEqual(true);
    });
    it('can cast values to an array', () => {
      expect(castToArray('hi')).toEqual(['hi']);
      expect(castToArray('hello, my name is willow')).toEqual(['hello, my name is willow']);
      expect(castToArray(5)).toEqual([5]);
      expect(castToArray(false)).toEqual([false]);
    });
    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(String)).toEqual(castToString);
    expect(getCaster(Boolean)).toEqual(castToBoolean);
    expect(getCaster(Promise)).toBeNull();
  });
});
