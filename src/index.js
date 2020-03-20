const createHashName = (data) => {
  if (data.length === 1 && typeof data[0] === 'function') {
    return data[0];
  }

  switch (typeof data) {
    case 'function':
      return data;
    case 'object':
      return JSON.stringify(data);
    default:
      return data.toString();
  }
};

<<<<<<< Updated upstream:index.js
module.exports = {
  memo,
  createHashName
};
=======
const deepEqual = (a, b) => {
  if (a === b) {
    return true;
  }

  if (a == null || typeof a !== 'object' || b == null || typeof b !== 'object') {
    return false;
  }

  let propertiesInA = 0;
  let propertiesInB = 0;
  for (const property in a) {
    propertiesInA += 1;
  }
  for (const property in b) {
    propertiesInB += 1;
    if (!(property in a) || !deepEqual(a[property], b[property])) {
      return false;
    }
  }
  return propertiesInA === propertiesInB;
};

const memo = func => {
  const hash = new Map();
  return (...arg) => {
    const hashName = createHashName(arg);
    if (hash.has(hashName)) {
      return hash.get(hashName);
    }
    const res = func(...arg);
    hash.set(hashName, res);
    return res;
  };
};

module.exports = {
  memo,
  createHashName,
  deepEqual,
};
>>>>>>> Stashed changes:src/index.js
