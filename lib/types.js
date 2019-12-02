const isNumber = val => typeof val === 'number';

const castToNumber = val => {
  if(isNumber(val)) return val;

  const number = Number(val);
  if(isNaN(number)) { throw new CastError(Number, val);
  }

  return number;
};

const isString = val => typeof val === 'string';

const castToString = val => {
  if(isString(val)) return val;
  const string = String(val);
  return string;
};
const isBoolean = val => typeof val === 'boolean';

const castToBoolean = val => {
  if(isBoolean(val)) return val;
  const boolean = Boolean(val);
  return boolean;
};

class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const casters = {
  Number: castToNumber,
};

const getCaster = Type => {
  return casters[Type.name] || null;
};

module.exports = {
  isNumber,
  CastError,
  getCaster,
  castToNumber,
  isString,
  castToString,
  isBoolean,
  castToBoolean
};
